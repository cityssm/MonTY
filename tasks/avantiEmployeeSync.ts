import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async'

import exitHook from 'exit-hook'

import * as avanti from '@cityssm/avanti-api'
import * as configFunctions from '../helpers/functions.config.js'

import { getEmployee } from '../database/getEmployee.js'
import { createEmployee } from '../database/createEmployee.js'

import type { Employee, PartialSession } from '../types/recordTypes.js'

import Debug from 'debug'
import { updateEmployee } from '../database/updateEmployee.js'
import { deleteMissingSyncedEmployees } from '../database/deleteMissingSyncedEmployees.js'
const debug = Debug('monty:avantiEmployeeSync')

let terminateTask = false

const partialSession: PartialSession = {
  user: {
    userName: 'sys.employeeSync',
    canLogin: true,
    isAdmin: false
  }
}

const avantiConfig = configFunctions.getProperty('settings.avantiSync.config')
avanti.setConfiguration(avantiConfig)

const getEmployeeOptions: avanti.GetEmployees_Request = {
  skip: 0,
  take: 10_000
}

if (configFunctions.getProperty('settings.avantiSync.locationCodes')) {
  getEmployeeOptions.locations = configFunctions.getProperty(
    'settings.avantiSync.locationCodes'
  )
}

async function doSync(): Promise<void> {
  debug('Requesting employees from API...')

  const employees = await avanti.getEmployees(getEmployeeOptions)

  if (!employees.success) {
    debug(employees.error)
    return
  }

  const syncDateTime = new Date()

  debug(
    `Processing ${employees.response.employees?.length ?? 0} employee(s)...`
  )

  for (const avantiEmployee of employees.response.employees ?? []) {
    if (terminateTask) {
      break
    }

    if (!avantiEmployee.empNo || !(avantiEmployee.active ?? false)) {
      // Avanti employee record has no employee number
      // Skip the record
      continue
    }

    const currentEmployee = await getEmployee(avantiEmployee.empNo)

    const newEmployee: Employee = {
      employeeNumber: avantiEmployee.empNo,
      employeeSurname: avantiEmployee.surname ?? '',
      employeeGivenName: avantiEmployee.givenName ?? '',
      jobTitle: avantiEmployee.positionName ?? '',
      isSynced: true,
      syncDateTime,
      isActive: true
    }

    if (!currentEmployee) {
      // Create the record
      await createEmployee(newEmployee, partialSession)
    } else if (currentEmployee.isSynced ?? false) {
      // Syncing on, update the employee
      await updateEmployee(newEmployee, partialSession)
    }
  }

  const employeesDeleted = await deleteMissingSyncedEmployees(
    syncDateTime,
    partialSession
  )

  debug(`${employeesDeleted} employee(s) deleted`)
}

await doSync().catch(() => {
  // ignore
})

const intervalID = setIntervalAsync(doSync, 6 * 3600 * 1000)

exitHook(() => {
  terminateTask = true
  try {
    void clearIntervalAsync(intervalID)
  } catch {
    // ignore
  }
})

import type { Request, Response } from 'express'

import { getAbsenceRecords } from '../../database/getAbsenceRecords.js'
import { getCallOutLists } from '../../database/getCallOutLists.js'
import { getEmployees } from '../../database/getEmployees.js'
import { getReturnToWorkRecords } from '../../database/getReturnToWorkRecords.js'
import { getCallOutResponseTypes } from '../../helpers/functions.cache.js'
import * as configFunctions from '../../helpers/functions.config.js'
import * as permissionFunctions from '../../helpers/functions.permissions.js'
import type * as recordTypes from '../../types/recordTypes'

function canViewAbsences(user: recordTypes.User): boolean {
  return (
    configFunctions.getProperty('features.attendance.absences') &&
    permissionFunctions.hasPermission(user, 'attendance.absences.canView')
  )
}

function canViewReturnsToWork(user: recordTypes.User): boolean {
  return (
    configFunctions.getProperty('features.attendance.returnsToWork') &&
    permissionFunctions.hasPermission(user, 'attendance.returnsToWork.canView')
  )
}

function canViewCallOuts(user: recordTypes.User): boolean {
  return (
    configFunctions.getProperty('features.attendance.callOuts') &&
    permissionFunctions.hasPermission(user, 'attendance.callOuts.canView')
  )
}

function canUpdateCallOuts(user: recordTypes.User): boolean {
  return (
    canViewCallOuts(user) &&
    permissionFunctions.hasPermission(user, 'attendance.callOuts.canUpdate')
  )
}

function isTemporaryAdmin(user: recordTypes.User): boolean {
  return (
    configFunctions.getProperty('application.allowTesting') &&
    (user.userName.startsWith('~~') ?? false) &&
    (user.isAdmin ?? false)
  )
}

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  let absenceRecords: recordTypes.AbsenceRecord[] = []

  if (canViewAbsences(request.session.user!)) {
    absenceRecords = await getAbsenceRecords(
      {
        recentOnly: true,
        todayOnly: true
      },
      request.session
    )
  }

  let returnToWorkRecords: recordTypes.ReturnToWorkRecord[] = []

  if (canViewReturnsToWork(request.session.user!)) {
    returnToWorkRecords = await getReturnToWorkRecords(
      {
        recentOnly: true,
        todayOnly: true
      },
      request.session
    )
  }

  let callOutLists: recordTypes.CallOutList[] = []

  if (canViewCallOuts(request.session.user!)) {
    callOutLists = await getCallOutLists(
      { favouriteOnly: true },
      request.session
    )
  }

  let callOutResponseTypes: recordTypes.CallOutResponseType[] = []

  if (canUpdateCallOuts(request.session.user!)) {
    callOutResponseTypes = await getCallOutResponseTypes()
  }

  let employeeNumber = ''
  let lastFourDigits = ''
  let lastFourDigitsBad = 1000

  if (isTemporaryAdmin(request.session.user!)) {
    const employees = await getEmployees(
      {
        isActive: true
      },
      { includeProperties: false }
    )

    const employeeNumberRegex = configFunctions.getProperty(
      'settings.employeeNumberRegularExpression'
    )

    for (const employee of employees) {
      employeeNumber = employee.employeeNumber

      if (
        employeeNumberRegex !== undefined &&
        !employeeNumberRegex.test(employeeNumber)
      ) {
        continue
      }

      const possibleFourDigits1 = (employee.homeContact1 ?? '').slice(-4)
      const possibleFourDigits2 = (employee.homeContact2 ?? '').slice(-4)

      if (/\d{4}/.test(possibleFourDigits1)) {
        lastFourDigits = possibleFourDigits1
      } else if (/\d{4}/.test(possibleFourDigits2)) {
        lastFourDigits = possibleFourDigits2
      }

      if (lastFourDigits !== '') {
        while (
          lastFourDigitsBad.toString() === possibleFourDigits1 ||
          lastFourDigitsBad.toString() === possibleFourDigits2
        ) {
          lastFourDigitsBad += 1
        }
      }
    }
  }

  response.render('dashboard', {
    headTitle: 'Dashboard',
    absenceRecords,
    returnToWorkRecords,
    callOutLists,
    callOutResponseTypes,

    employeeNumber,
    lastFourDigits,
    lastFourDigitsBad: lastFourDigitsBad.toString()
  })
}

export default handler

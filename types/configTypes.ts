// eslint-disable-next-line node/no-extraneous-import

import type { ADWebAuthConfig } from '@cityssm/ad-web-auth-connector/types'
import type { Configuration as AvantiConfig } from '@cityssm/avanti-api'
import type { config as MSSQLConfig } from 'mssql'

import type { availablePermissionValues } from '../helpers/functions.permissions.js'

import type { Employee, User } from './recordTypes.js'

export interface Config {
  application: {
    applicationName?: string
    backgroundURL?: string
    bigLogoURL?: string
    smallLogoURL?: string
    httpPort?: number
    userDomain?: string
    maximumProcesses?: number
    allowTesting?: boolean
  }
  session: {
    cookieName?: string
    secret?: string
    maxAgeMillis?: number
    doKeepAlive?: boolean
  }
  reverseProxy: {
    disableCompression?: boolean
    disableEtag?: boolean
    urlPrefix?: '' | `/${string}`
  }

  activeDirectory?: ConfigActiveDirectory
  adWebAuthConfig?: ADWebAuthConfig

  tempUsers?: ConfigTemporaryUserCredentials[]

  mssql?: MSSQLConfig
  aliases: Record<string, string>
  features: {
    attendance?: {
      absences?: boolean
      afterHours?: boolean
      callOuts?: boolean
      returnsToWork?: boolean
    }
    employees?: {
      avantiSync?: boolean
    }
    selfService?: boolean
  }
  settings: {
    printPdf?: {
      contentDisposition?: 'attachment' | 'inline'
    }
    avantiSync?: {
      config: AvantiConfig
      locationCodes?: string[]
    }
    employeeSortKeyFunctions?: ConfigEmployeeSortKeyFunction[]
    employeeEligibilityFunctions?: ConfigEmployeeEligibilityFunction[]
    employeeNumberRegularExpression?: RegExp
    recentDays?: number
    updateDays?: number

    selfService?: {
      path?: `/${string}`
    }
  }
}

export interface ConfigActiveDirectory {
  url: string
  baseDN: string
  username: string
  password: string
}

export interface ConfigEmployeeSortKeyFunction {
  functionName: string
  sortKeyFunction: (employee: Employee, employeePropertyName?: string) => string
}

export interface ConfigEmployeeEligibilityFunction {
  functionName: string
  eligibilityFunction: (
    employee: Employee,
    employeePropertyName?: string
  ) => boolean
}

export interface ConfigTemporaryUserCredentials {
  user: ConfigTemporaryUser
  password: string
}

export interface ConfigTemporaryUser extends User {
  userName: `~~${string}`
  permissions: Partial<Record<keyof typeof availablePermissionValues, string>>
}

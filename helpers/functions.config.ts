/* eslint-disable @typescript-eslint/indent */

import './polyfills.js'

import type { ADWebAuthConfig } from '@cityssm/ad-web-auth-connector/types'
import type { Configuration as AvantiConfig } from '@cityssm/avanti-api'
import type { config as MSSQLConfig } from 'mssql'

import { config } from '../data/config.js'
import type * as configTypes from '../types/configTypes'

/*
 * SET UP FALLBACK VALUES
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const property_session_maxAgeMillis = 'session.maxAgeMillis'

const configFallbackValues = new Map<string, unknown>()

configFallbackValues.set('application.applicationName', 'MonTY')
configFallbackValues.set(
  'application.backgroundURL',
  '/images/truck-background.jpg'
)
configFallbackValues.set('application.bigLogoURL', '/images/monty-big.svg')
configFallbackValues.set('application.smallLogoURL', '/images/monty-small.svg')
configFallbackValues.set('application.httpPort', 7000)
configFallbackValues.set('application.maximumProcesses', 4)
configFallbackValues.set('application.allowTesting', false)

configFallbackValues.set('tempUsers', [])

configFallbackValues.set('reverseProxy.disableCompression', false)
configFallbackValues.set('reverseProxy.disableEtag', false)
configFallbackValues.set('reverseProxy.urlPrefix', '')

configFallbackValues.set('session.cookieName', 'monty-user-sid')
configFallbackValues.set('session.secret', 'cityssm/monty')
configFallbackValues.set(property_session_maxAgeMillis, 60 * 60 * 1000)
configFallbackValues.set('session.doKeepAlive', false)

configFallbackValues.set('features.attendance.absences', true)
configFallbackValues.set('features.attendance.callOuts', true)
configFallbackValues.set('features.attendance.returnsToWork', true)
configFallbackValues.set('features.attendance.afterHours', true)

configFallbackValues.set('features.employees.avantiSync', false)
configFallbackValues.set('features.selfService', false)

configFallbackValues.set('settings.avantiSync.locationCodes', [])

configFallbackValues.set('settings.employeeEligibilityFunctions', [])
configFallbackValues.set('settings.employeeSortKeyFunctions', [])

configFallbackValues.set('settings.printPdf.contentDisposition', 'attachment')

configFallbackValues.set('settings.recentDays', 10)
configFallbackValues.set('settings.updateDays', 5)

configFallbackValues.set('settings.selfService.path', '/selfService')

/*
 * Set up function overloads
 */

export function getProperty(propertyName: 'application.applicationName'): string

export function getProperty(propertyName: 'application.backgroundURL'): string
export function getProperty(propertyName: 'application.bigLogoURL'): string
export function getProperty(propertyName: 'application.smallLogoURL'): string

export function getProperty(propertyName: 'application.httpPort'): number
export function getProperty(propertyName: 'application.userDomain'): string

export function getProperty(propertyName: 'application.allowTesting'): boolean

export function getProperty(
  propertyName: 'tempUsers'
): configTypes.ConfigTemporaryUserCredentials[]

export function getProperty(
  propertyName: 'activeDirectory'
): configTypes.ConfigActiveDirectory | undefined

export function getProperty(
  propertyName: 'adWebAuthConfig'
): ADWebAuthConfig | undefined

export function getProperty(
  propertyName: 'application.maximumProcesses'
): number

export function getProperty(
  propertyName: 'reverseProxy.disableCompression'
): boolean

export function getProperty(propertyName: 'reverseProxy.disableEtag'): boolean
export function getProperty(propertyName: 'reverseProxy.urlPrefix'): string

export function getProperty(propertyName: 'session.cookieName'): string
export function getProperty(propertyName: 'session.doKeepAlive'): boolean
export function getProperty(propertyName: 'session.maxAgeMillis'): number
export function getProperty(propertyName: 'session.secret'): string

export function getProperty(
  propertyName: 'features.attendance.absences'
): boolean
export function getProperty(
  propertyName: 'features.attendance.callOuts'
): boolean
export function getProperty(
  propertyName: 'features.attendance.returnsToWork'
): boolean
export function getProperty(
  propertyName: 'features.attendance.afterHours'
): boolean

export function getProperty(
  propertyName: 'features.employees.avantiSync'
): boolean

export function getProperty(propertyName: 'features.selfService'): boolean

export function getProperty(propertyName: 'mssql'): MSSQLConfig

export function getProperty(
  propertyName: 'settings.avantiSync.config'
): AvantiConfig
export function getProperty(
  propertyName: 'settings.avantiSync.locationCodes'
): string[]

export function getProperty(
  propertyName: 'settings.printPdf.contentDisposition'
): 'attachment' | 'inline'

export function getProperty(
  propertyName: 'settings.employeeEligibilityFunctions'
): configTypes.ConfigEmployeeEligibilityFunction[]

export function getProperty(
  propertyName: 'settings.employeeSortKeyFunctions'
): configTypes.ConfigEmployeeSortKeyFunction[]

export function getProperty(
  propertyName: 'settings.employeeNumberRegularExpression'
): RegExp | undefined

export function getProperty(propertyName: 'settings.recentDays'): number
export function getProperty(propertyName: 'settings.updateDays'): number

export function getProperty(
  propertyName: 'settings.selfService.path'
): `/${string}`

export function getProperty(propertyName: string): unknown {
  const propertyNameSplit = propertyName.split('.')

  let currentObject = config

  for (const propertyNamePiece of propertyNameSplit) {
    if (Object.hasOwn(currentObject, propertyNamePiece)) {
      currentObject = currentObject[propertyNamePiece]
      continue
    }

    return configFallbackValues.get(propertyName)
  }

  return currentObject
}

export function includeAttendance(): boolean {
  return (
    getProperty('features.attendance.absences') ||
    getProperty('features.attendance.callOuts') ||
    getProperty('features.attendance.returnsToWork')
  )
}

export const historicalDays = getProperty('settings.recentDays') * 3
export const deleteDays = historicalDays * 3

export const keepAliveMillis = getProperty('session.doKeepAlive')
  ? Math.max(
      getProperty(property_session_maxAgeMillis) / 2,
      getProperty(property_session_maxAgeMillis) - 10 * 60 * 1000
    )
  : 0

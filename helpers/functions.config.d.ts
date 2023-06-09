import './polyfills.js';
import type { ADWebAuthConfig } from '@cityssm/ad-web-auth-connector/types';
import type { Configuration as AvantiConfig } from '@cityssm/avanti-api';
import type { config as MSSQLConfig } from 'mssql';
import type * as configTypes from '../types/configTypes';
export declare function getProperty(propertyName: 'application.applicationName'): string;
export declare function getProperty(propertyName: 'application.backgroundURL'): string;
export declare function getProperty(propertyName: 'application.bigLogoURL'): string;
export declare function getProperty(propertyName: 'application.smallLogoURL'): string;
export declare function getProperty(propertyName: 'application.httpPort'): number;
export declare function getProperty(propertyName: 'application.userDomain'): string;
export declare function getProperty(propertyName: 'application.allowTesting'): boolean;
export declare function getProperty(propertyName: 'tempUsers'): configTypes.ConfigTemporaryUserCredentials[];
export declare function getProperty(propertyName: 'activeDirectory'): configTypes.ConfigActiveDirectory | undefined;
export declare function getProperty(propertyName: 'adWebAuthConfig'): ADWebAuthConfig | undefined;
export declare function getProperty(propertyName: 'application.maximumProcesses'): number;
export declare function getProperty(propertyName: 'reverseProxy.disableCompression'): boolean;
export declare function getProperty(propertyName: 'reverseProxy.disableEtag'): boolean;
export declare function getProperty(propertyName: 'reverseProxy.urlPrefix'): string;
export declare function getProperty(propertyName: 'session.cookieName'): string;
export declare function getProperty(propertyName: 'session.doKeepAlive'): boolean;
export declare function getProperty(propertyName: 'session.maxAgeMillis'): number;
export declare function getProperty(propertyName: 'session.secret'): string;
export declare function getProperty(propertyName: 'features.attendance.absences'): boolean;
export declare function getProperty(propertyName: 'features.attendance.callOuts'): boolean;
export declare function getProperty(propertyName: 'features.attendance.returnsToWork'): boolean;
export declare function getProperty(propertyName: 'features.attendance.afterHours'): boolean;
export declare function getProperty(propertyName: 'features.employees.avantiSync'): boolean;
export declare function getProperty(propertyName: 'features.selfService'): boolean;
export declare function getProperty(propertyName: 'mssql'): MSSQLConfig;
export declare function getProperty(propertyName: 'settings.avantiSync.config'): AvantiConfig;
export declare function getProperty(propertyName: 'settings.avantiSync.locationCodes'): string[];
export declare function getProperty(propertyName: 'settings.printPdf.contentDisposition'): 'attachment' | 'inline';
export declare function getProperty(propertyName: 'settings.employeeEligibilityFunctions'): configTypes.ConfigEmployeeEligibilityFunction[];
export declare function getProperty(propertyName: 'settings.employeeSortKeyFunctions'): configTypes.ConfigEmployeeSortKeyFunction[];
export declare function getProperty(propertyName: 'settings.employeeNumberRegularExpression'): RegExp | undefined;
export declare function getProperty(propertyName: 'settings.recentDays'): number;
export declare function getProperty(propertyName: 'settings.updateDays'): number;
export declare function getProperty(propertyName: 'settings.selfService.path'): `/${string}`;
export declare function includeAttendance(): boolean;
export declare const historicalDays: number;
export declare const deleteDays: number;
export declare const keepAliveMillis: number;

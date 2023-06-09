import type { Config } from '../types/configTypes.js'

import * as configFunctions from './functions.js'
import * as configFunctionsSSM from './functions.ssm.js'

export const config: Config = {
  application: {
    applicationName: 'MonTY Call Outs and Attendance'
  },
  reverseProxy: {
    urlPrefix: '/monty'
  },
  session: {},
  aliases: {},
  features: {
    attendance: {
      absences: true,
      afterHours: true,
      callOuts: true,
      returnsToWork: true
    },
    employees: {
      avantiSync: true
    },
    selfService: true
  },
  settings: {
    printPdf: {
      contentDisposition: 'attachment'
    },
    employeeEligibilityFunctions: [
      configFunctions.eligibility_hasProperty,
      configFunctionsSSM.eligibility_unionized,
      configFunctionsSSM.eligibility_operator,
      configFunctionsSSM.eligibility_operatorJC6,
      configFunctionsSSM.eligibility_operatorJC7,
      configFunctionsSSM.eligibility_operatorJC8
    ],
    employeeSortKeyFunctions: [
      configFunctions.sortKey_seniorityDate,
      configFunctions.sortKey_propertyValue,
      configFunctions.sortKey_alphabetical
    ],
    employeeNumberRegularExpression: /^\d{5,9}$/,
    recentDays: 14,
    updateDays: 4,
    selfService: {}
  }
}

export default config

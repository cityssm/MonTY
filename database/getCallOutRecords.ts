import * as configFunctions from '../helpers/functions.config.js'

import * as sqlPool from '@cityssm/mssql-multi-pool'
import type { IResult } from 'mssql'

import type { CallOutRecord } from '../types/recordTypes'

interface GetCallOutRecordsFilters {
  listId?: string
  employeeNumber?: string
  recentOnly: boolean
}

export async function getCallOutRecords(filters: GetCallOutRecordsFilters): Promise<CallOutRecord[]> {
  const pool = await sqlPool.connect(configFunctions.getProperty('mssql'))

  let sql = `select r.recordId, r.listId, r.employeeNumber,
    r.callOutDateTime, r.callOutHours,
    r.responseTypeId, t.responseType, t.isSuccessful,
    r.recordComment,
    r.recordCreate_userName
    from MonTY.CallOutRecords r
    left join MonTY.CallOutResponseTypes t on r.responseTypeId = t.responseTypeId
    where r.recordDelete_dateTime is null`

  let request = pool.request()

  if ((filters.listId ?? '') !== '') {
    sql += ' and r.listId = @listId'
    request = request.input('listId', filters.listId)
  }

  if ((filters.employeeNumber ?? '') !== '') {
    sql += ' and r.employeeNumber = @employeeNumber'
    request = request.input('employeeNumber', filters.employeeNumber)
  }

  if (filters.recentOnly) {
    sql += ' and datediff(day, r.callOutDateTime, getdate()) <= @recentDays'
    request = request.input('recentDays', configFunctions.getProperty('settings.recentDays'))
  }

  sql += ' order by r.callOutDateTime desc, r.recordId desc'

  const recordsResult: IResult<CallOutRecord> = await request
    .query(sql)

  return recordsResult.recordset
}

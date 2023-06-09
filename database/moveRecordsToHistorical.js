import * as sqlPool from '@cityssm/mssql-multi-pool';
import * as configFunctions from '../helpers/functions.config.js';
export async function moveRecordsToHistorical() {
    const pool = await sqlPool.connect(configFunctions.getProperty('mssql'));
    let rowsAffected = 0;
    let result = await pool
        .request()
        .input('historicalDays', configFunctions.historicalDays)
        .query(`insert into MonTY.HistoricalAbsenceRecords
      (recordId, employeeNumber, employeeName, absenceDateTime, absenceTypeKey, returnDateTime, recordComment,
        recordCreate_userName, recordCreate_dateTime,
        recordUpdate_userName, recordUpdate_dateTime,
        recordDelete_userName, recordDelete_dateTime)
      select recordId, employeeNumber, employeeName, absenceDateTime, absenceTypeKey, returnDateTime, recordComment,
        recordCreate_userName, recordCreate_dateTime,
        recordUpdate_userName, recordUpdate_dateTime,
        recordDelete_userName, recordDelete_dateTime
      from MonTY.AbsenceRecords
      where datediff(day, recordUpdate_dateTime, getdate()) > @historicalDays
      and datediff(day, absenceDateTime, getdate()) > @historicalDays
      and (returnDateTime is null or datediff(day, returnDateTime, getdate()) > @historicalDays)`);
    if (result.rowsAffected[0] > 0) {
        rowsAffected += result.rowsAffected[0];
        await pool.request().query(`delete from MonTY.AbsenceRecords
        where recordId in (select recordId from MonTY.HistoricalAbsenceRecords)`);
    }
    result = await pool
        .request()
        .input('historicalDays', configFunctions.historicalDays)
        .query(`insert into MonTY.HistoricalReturnToWorkRecords
      (recordId, employeeNumber, employeeName, returnDateTime, returnShift, recordComment,
        recordCreate_userName, recordCreate_dateTime,
        recordUpdate_userName, recordUpdate_dateTime,
        recordDelete_userName, recordDelete_dateTime)
      select recordId, employeeNumber, employeeName, returnDateTime, returnShift, recordComment,
        recordCreate_userName, recordCreate_dateTime,
        recordUpdate_userName, recordUpdate_dateTime,
        recordDelete_userName, recordDelete_dateTime
      from MonTY.ReturnToWorkRecords
      where datediff(day, recordUpdate_dateTime, getdate()) > @historicalDays
      and datediff(day, returnDateTime, getdate()) > @historicalDays`);
    if (result.rowsAffected[0] > 0) {
        rowsAffected += result.rowsAffected[0];
        await pool.request().query(`delete from MonTY.ReturnToWorkRecords
        where recordId in (select recordId from MonTY.HistoricalReturnToWorkRecords)`);
    }
    result = await pool
        .request()
        .input('historicalDays', configFunctions.historicalDays)
        .query(`insert into MonTY.HistoricalCallOutRecords
      (recordId, listId, employeeNumber, callOutDateTime, callOutHours, responseTypeId, recordComment,
        recordCreate_userName, recordCreate_dateTime,
        recordUpdate_userName, recordUpdate_dateTime,
        recordDelete_userName, recordDelete_dateTime)
      select recordId, listId, employeeNumber, callOutDateTime, callOutHours, responseTypeId, recordComment,
        recordCreate_userName, recordCreate_dateTime,
        recordUpdate_userName, recordUpdate_dateTime,
        recordDelete_userName, recordDelete_dateTime
      from MonTY.CallOutRecords
      where datediff(day, recordUpdate_dateTime, getdate()) > @historicalDays
      and datediff(day, callOutDateTime, getdate()) > @historicalDays`);
    if (result.rowsAffected[0] > 0) {
        rowsAffected += result.rowsAffected[0];
        await pool.request().query(`delete from MonTY.CallOutRecords
        where recordId in (select recordId from MonTY.HistoricalCallOutRecords)`);
    }
    result = await pool
        .request()
        .input('historicalDays', configFunctions.historicalDays)
        .query(`insert into MonTY.HistoricalAfterHoursRecords
      (recordId, employeeNumber, employeeName, attendanceDateTime, afterHoursReasonId, recordComment,
        recordCreate_userName, recordCreate_dateTime,
        recordUpdate_userName, recordUpdate_dateTime,
        recordDelete_userName, recordDelete_dateTime)
      select recordId, employeeNumber, employeeName, attendanceDateTime, afterHoursReasonId, recordComment,
        recordCreate_userName, recordCreate_dateTime,
        recordUpdate_userName, recordUpdate_dateTime,
        recordDelete_userName, recordDelete_dateTime
      from MonTY.AfterHoursRecords
      where datediff(day, recordUpdate_dateTime, getdate()) > @historicalDays
      and datediff(day, attendanceDateTime, getdate()) > @historicalDays`);
    if (result.rowsAffected[0] > 0) {
        rowsAffected += result.rowsAffected[0];
        await pool.request().query(`delete from MonTY.AfterHoursRecords
        where recordId in (select recordId from MonTY.HistoricalAfterHoursRecords)`);
    }
    return rowsAffected;
}

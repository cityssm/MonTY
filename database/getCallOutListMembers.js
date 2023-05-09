import '../helpers/polyfills.js';
import * as configFunctions from '../helpers/functions.config.js';
import * as sqlPool from '@cityssm/mssql-multi-pool';
export async function getCallOutListMembers(filters, options) {
    const pool = await sqlPool.connect(configFunctions.getProperty('mssql'));
    let request = pool.request();
    let sql = `select m.listId, m.employeeNumber,
    m.sortKey,
    ${options.includeSortKeyFunction ?? false
        ? ' l.sortKeyFunction, l.employeePropertyName,'
        : ''}
    e.employeeSurname, e.employeeGivenName,
    e.workContact1, e.workContact2, e.homeContact1, e.homeContact2,
    e.jobTitle, e.department,
    e.seniorityDateTime,
    max(r.callOutDateTime) as callOutDateTimeMax
    from MonTY.CallOutListMembers m
    left join MonTY.Employees e on m.employeeNumber = e.employeeNumber
    ${options.includeSortKeyFunction ?? false
        ? ' left join MonTY.CallOutLists l on m.listId = l.listId'
        : ''}
    left join MonTY.CallOutRecords r on m.listId = r.listId and m.employeeNumber = r.employeeNumber and r.recordDelete_dateTime is null
    where m.recordDelete_dateTime is null
    and e.isActive = 1
    and e.recordDelete_dateTime is null`;
    if ((filters.listId ?? '') !== '') {
        sql += ' and m.listId = @listId';
        request = request.input('listId', filters.listId);
    }
    if ((filters.employeeNumber ?? '') !== '') {
        sql += ' and m.employeeNumber = @employeeNumber';
        request = request.input('employeeNumber', filters.employeeNumber);
    }
    sql += ` group by m.listId, m.employeeNumber,
      m.sortKey,
      ${options.includeSortKeyFunction ?? false
        ? ' l.sortKeyFunction, l.employeePropertyName,'
        : ''}
      e.employeeSurname, e.employeeGivenName,
      e.workContact1, e.workContact2, e.homeContact1, e.homeContact2,
      e.jobTitle, e.department,
      e.seniorityDateTime
    order by m.sortKey, m.employeeNumber`;
    const propertyResult = await request.query(sql);
    return propertyResult.recordset;
}

import { deleteAfterHoursRecord } from '../../database/deleteAfterHoursRecord.js';
import { getAfterHoursRecord } from '../../database/getAfterHoursRecord.js';
import { getAfterHoursRecords } from '../../database/getAfterHoursRecords.js';
export async function handler(request, response) {
    const recordId = request.body.recordId;
    const afterHoursRecord = await getAfterHoursRecord(recordId, request.session.user);
    if (afterHoursRecord === undefined) {
        return response.json({
            success: false,
            errorMessage: 'After hours record not found.'
        });
    }
    if (!afterHoursRecord.canUpdate) {
        return response.json({
            success: false,
            errorMessage: 'Access denied.'
        });
    }
    const success = await deleteAfterHoursRecord(recordId, request.session.user);
    const afterHoursRecords = await getAfterHoursRecords({
        recentOnly: true,
        todayOnly: false
    }, request.session.user);
    response.json({
        success,
        afterHoursRecords
    });
}
export default handler;

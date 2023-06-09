import { moveRecordDown, moveRecordDownToBottom } from '../../database/moveRecord.js';
import { getCallOutResponseTypes } from '../../helpers/functions.cache.js';
export async function handler(request, response) {
    const success = request.body.moveToEnd === '1'
        ? await moveRecordDownToBottom('CallOutResponseTypes', request.body.responseTypeId)
        : await moveRecordDown('CallOutResponseTypes', request.body.responseTypeId);
    const callOutResponseTypes = await getCallOutResponseTypes();
    response.json({
        success,
        callOutResponseTypes
    });
}
export default handler;

import { addAfterHoursReason } from '../../database/addAfterHoursReason.js';
import { getAfterHoursReasons } from '../../database/getAfterHoursReasons.js';
export async function handler(request, response) {
    const afterHoursReasonId = await addAfterHoursReason(request.body, request.session);
    const afterHoursReasons = await getAfterHoursReasons();
    response.json({
        success: true,
        afterHoursReasonId,
        afterHoursReasons
    });
}
export default handler;
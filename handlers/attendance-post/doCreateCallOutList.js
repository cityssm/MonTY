import { createCallOutList } from '../../database/createCallOutList.js';
import { getCallOutLists } from '../../database/getCallOutLists.js';
export async function handler(request, response) {
    const listId = await createCallOutList(request.body, request.session);
    const callOutLists = await getCallOutLists(request.session);
    response.json({
        success: true,
        listId,
        callOutLists
    });
}
export default handler;

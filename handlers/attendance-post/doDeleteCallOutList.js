import { deleteCallOutList } from '../../database/deleteCallOutList.js';
import { getCallOutLists } from '../../database/getCallOutLists.js';
export async function handler(request, response) {
    const success = await deleteCallOutList(request.body.listId, request.session);
    const callOutLists = await getCallOutLists(request.session);
    response.json({
        success,
        callOutLists
    });
}
export default handler;

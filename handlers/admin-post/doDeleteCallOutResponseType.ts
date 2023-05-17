import type { Request, Response } from 'express'

import { deleteCallOutResponseType } from '../../database/deleteCallOutResponseType.js'
import { getCallOutResponseTypes } from '../../database/getCallOutResponseTypes.js'

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  const success = await deleteCallOutResponseType(
    request.body.responseTypeId,
    request.session
  )

  const callOutResponseTypes = await getCallOutResponseTypes()

  response.json({
    success,
    callOutResponseTypes
  })
}

export default handler

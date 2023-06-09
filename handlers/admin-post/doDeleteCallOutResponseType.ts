import type { Request, Response } from 'express'

import { deleteCallOutResponseType } from '../../database/deleteCallOutResponseType.js'
import { getCallOutResponseTypes } from '../../helpers/functions.cache.js'

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  const success = await deleteCallOutResponseType(
    request.body.responseTypeId,
    request.session.user!
  )

  const callOutResponseTypes = await getCallOutResponseTypes()

  response.json({
    success,
    callOutResponseTypes
  })
}

export default handler

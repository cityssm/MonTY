/* eslint-disable @typescript-eslint/indent */

import type { Request, Response } from 'express'

import { moveRecordUp, moveRecordUpToTop } from '../../database/moveRecord.js'
import { getCallOutResponseTypes } from '../../helpers/functions.cache.js'

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  const success =
    request.body.moveToEnd === '1'
      ? await moveRecordUpToTop(
          'CallOutResponseTypes',
          request.body.responseTypeId
        )
      : await moveRecordUp('CallOutResponseTypes', request.body.responseTypeId)

  const callOutResponseTypes = await getCallOutResponseTypes()

  response.json({
    success,
    callOutResponseTypes
  })
}

export default handler

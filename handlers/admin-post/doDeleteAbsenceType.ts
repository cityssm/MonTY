import type { Request, Response } from 'express'

import { deleteAbsenceType } from '../../database/deleteAbsenceType.js'
import { getAbsenceTypes } from '../../database/getAbsenceTypes.js'

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  const success = await deleteAbsenceType(
    request.body.absenceTypeKey,
    request.session
  )

  const absenceTypes = await getAbsenceTypes()

  response.json({
    success,
    absenceTypes
  })
}

export default handler

import type { Request, Response } from 'express'

import { getAbsenceRecords } from '../../database/getAbsenceRecords.js'
import { getReturnToWorkRecords } from '../../database/getReturnToWorkRecords.js'

import { addAbsenceRecord } from '../../database/addAbsenceRecord.js'
import { addReturnToWorkRecord } from '../../database/addReturnToWorkRecord.js'

import * as permissionFunctions from '../../helpers/functions.permissions.js'

import type * as recordTypes from '../../types/recordTypes'

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  const callInType: 'absence' | 'returnToWork' = request.body.callInType

  let success = false
  let recordId = ''

  let absenceRecords: recordTypes.AbsenceRecord[] = []
  let returnToWorkRecords: recordTypes.ReturnToWorkRecord[] = []

  switch (callInType) {
    case 'absence': {
      if (
        permissionFunctions.hasPermission(
          request.session.user!,
          'attendance.absences.canUpdate'
        )
      ) {
        recordId = await addAbsenceRecord(request.body, request.session)
        success = true
        absenceRecords = await getAbsenceRecords({
          recentOnly: true
        })
      }

      break
    }

    case 'returnToWork': {
      if (
        permissionFunctions.hasPermission(
          request.session.user!,
          'attendance.returnsToWork.canUpdate'
        )
      ) {
        recordId = await addReturnToWorkRecord(request.body, request.session)
        success = true
        returnToWorkRecords = await getReturnToWorkRecords({
          recentOnly: true
        })
      }

      break
    }
  }

  response.json({
    success,
    recordId,
    absenceRecords,
    returnToWorkRecords
  })
}

export default handler
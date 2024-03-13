import express, { Request, Response } from 'express'
import { RoleDefaultPermEntityAttributes } from '../../DataTransfer/RoleDefaultPermEntity'
import { ensureAuthenticated } from '../../auth/passportConfig'
import { getRolePermissions } from '../../database/UIServices/RoleDefaultPermService'
import { invalidRequest } from '../../services/errorHandling'
import { API_RESPONSE_CODE, API_RESPONSE_MAP, HTTP_OPERATION } from '../../types/enums'
import { HttpErrorResponseBody, HttpResponseGetAll } from '../../types/httpTypes'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, ensureAuthenticated, async (req: Request, res: Response) => {
  const requestData: { role_id: number } = req.body
  // add validations for body
  const _isValid: boolean = true

  if (!_isValid) {
    invalidRequest(res, `request invalid`)
  } else {
    try {
      const yList: RoleDefaultPermEntityAttributes[] = await getRolePermissions(requestData.role_id)
      const responseData: HttpResponseGetAll<RoleDefaultPermEntityAttributes> = {
        data: yList,
        responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].code,
        displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].displayMsg,
        totalCount: 0,
      }
      res.status(200).json(responseData)
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(500).json({
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_RETRIEVING_DATA].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_RETRIEVING_DATA].displayMsg,
          errorMessage: error.message,
        } as HttpErrorResponseBody)
    }
  }
})

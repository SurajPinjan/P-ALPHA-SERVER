import express, { Request, Response } from 'express'
import { ReportEntity } from '../../DataTransfer/Reports/ReportEntity'
import { getallReport, getCountReport } from '../../database/UIServices/ReportService'
import { invalidRequest } from '../../services/errorHandling'
import { API_RESPONSE_CODE, API_RESPONSE_MAP, HTTP_OPERATION } from '../../types/enums'
import { HttpErrorResponseBody, HttpGetAllRequestBody, HttpResponseGetAll } from '../../types/httpTypes'
import { ensureAuthenticated } from '../../auth/passportConfig'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, ensureAuthenticated, async (req: Request, res: Response) => {
  const requestData: HttpGetAllRequestBody = req.body
  // add validations for body
  const _isValid: boolean = true

  if (!_isValid) {
    invalidRequest(res, `request invalid`)
  } else {
    try {
      const yList: ReportEntity[] = await getallReport(
        requestData.filters,
        requestData.sorts,
        requestData.pageSize,
        requestData.pageNumber
      )
      const yListCount: number = await getCountReport(requestData.filters)
      const responseData: HttpResponseGetAll<ReportEntity> = {
        data: yList,
        responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].code,
        displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].displayMsg,
        totalCount: yListCount,
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

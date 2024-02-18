import express, { Request, Response } from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import { createOneY, getCountY, getOneY, getallY, updateOneY } from '../../database/CRUDServices/YCRUDService'
import { YModelAttributes, validateY } from '../../database/models/table_y'
import { validateuid } from '../../services/basicValidators'
import { invalidRequest } from '../../services/errorHandling'
import { API_RESPONSE_CODE, API_RESPONSE_MAP, HTTP_OPERATION } from '../../types/enums'
import {
  HttpCreateOneRequestBody,
  HttpErrorResponseBody,
  HttpGetAllRequestBody,
  HttpGetOneRequestBody,
  HttpResponseCreateOne,
  HttpResponseGetAll,
  HttpResponseGetOne,
  HttpUpdateOneRequestBody,
} from '../../types/httpTypes'
import { ValidationResult } from '../../types/validationTypes'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, ensureAuthenticated, async (req: Request, res: Response) => {
  const requestData: HttpGetAllRequestBody = req.body
  // add validations for body
  const _isValid: boolean = true

  if (!_isValid) {
    invalidRequest(res, `request invalid`)
  } else {
    try {
      const yList: YModelAttributes[] = await getallY(
        requestData.filters,
        requestData.sorts,
        requestData.pageSize,
        requestData.pageNumber
      )
      const yListCount: number = await getCountY(requestData.filters)
      const responseData: HttpResponseGetAll<YModelAttributes> = {
        data: yList,
        responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].code,
        displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].displayMsg,
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

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, async (req: Request, res: Response) => {
  const requestData: HttpGetOneRequestBody = req.body
  // add validations for body
  let _isValid: boolean = true

  _isValid = _isValid && validateuid(requestData.uid)

  if (!_isValid) {
    invalidRequest(res, `invalid uid`)
  } else {
    try {
      const x: YModelAttributes | null = await getOneY(requestData.uid)
      if (x == null) {
        const responseData: HttpErrorResponseBody = {
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.NOT_FOUND].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.NOT_FOUND].displayMsg,
          errorMessage: '-',
        }
        res.status(200).json(responseData)
      } else {
        const responseData: HttpResponseGetOne<YModelAttributes> = {
          data: x,
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].displayMsg,
        }
        res.status(200).json(responseData)
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(200).json({
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_RETRIEVING_DATA].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_RETRIEVING_DATA].displayMsg,
          errorMessage: error.message,
        } as HttpErrorResponseBody)
    }
  }
})

router.post(`/${HTTP_OPERATION.CREATE_ONE}`, isAuthenticatedAdmin, async (req: Request, res: Response) => {
  const requestData: HttpCreateOneRequestBody<YModelAttributes> = req.body
  // add validations for body

  const validation: ValidationResult = validateY(requestData.data)

  if (!validation.isValid) {
    invalidRequest(res, validation.message)
  } else {
    try {
      const x: YModelAttributes | null = await createOneY(requestData.data)
      if (x == null) {
        const responseData: HttpErrorResponseBody = {
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_CREATING].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_CREATING].displayMsg,
          errorMessage: '-',
        }
        res.status(200).json(responseData)
      } else {
        const responseData: HttpResponseCreateOne<YModelAttributes> = {
          data: x,
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].displayMsg,
        }
        res.status(200).json(responseData)
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(200).json({
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_CREATING].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_CREATING].displayMsg,
          errorMessage: error.message,
        } as HttpErrorResponseBody)
    }
  }
})

router.post(`/${HTTP_OPERATION.UPDATE_ONE}`, isAuthenticatedAdmin, async (req: Request, res: Response) => {
  const requestData: HttpUpdateOneRequestBody<YModelAttributes> = req.body
  const validation: ValidationResult = validateY(requestData.data)

  if (!validation.isValid) {
    invalidRequest(res, validation.message)
  } else {
    try {
      const x: YModelAttributes | null = await updateOneY(requestData.data)
      if (x == null) {
        const responseData: HttpErrorResponseBody = {
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_UPDATING_DATA].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_UPDATING_DATA].displayMsg,
          errorMessage: '-',
        }
        res.status(200).json(responseData)
      } else {
        const responseData: HttpResponseGetOne<YModelAttributes> = {
          data: x,
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].displayMsg,
        }
        res.status(200).json(responseData)
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(200).json({
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_UPDATING_DATA].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_UPDATING_DATA].displayMsg,
          errorMessage: error.message,
        } as HttpErrorResponseBody)
    }
  }
})

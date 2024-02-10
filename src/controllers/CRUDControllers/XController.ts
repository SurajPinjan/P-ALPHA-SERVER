import express, { Request, Response } from 'express'
import { X, XModelInstance, validateX } from '../../database/models/table_x'
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
import { isAuthenticatedAdmin } from '../../auth/passportConfig'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, isAuthenticatedAdmin, async (req: Request, res: Response) => {
  const requestData: HttpGetAllRequestBody = req.body
  // add validations for body
  const _isValid: boolean = true

  if (!_isValid) {
    invalidRequest(res, `request invalid`)
  } else {
    try {
      const xList: XModelInstance[] = await X.findAll({
        limit: requestData.pageSize,
        offset: requestData.pageNumber,
      })
      const xListCount: number = await X.count({})
      const responseData: HttpResponseGetAll<XModelInstance> = {
        data: xList,
        responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].code,
        displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS].displayMsg,
        totalCount: xListCount,
      }
      res.status(200).json(responseData)
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

router.post(`/${HTTP_OPERATION.GET_ONE}`, isAuthenticatedAdmin, async (req: Request, res: Response) => {
  const requestData: HttpGetOneRequestBody = req.body
  // add validations for body
  let _isValid: boolean = true

  _isValid = _isValid && validateuid(requestData.uid)

  if (!_isValid) {
    invalidRequest(res, `invalid uid`)
  } else {
    try {
      const x: XModelInstance | null = await X.findByPk(requestData.uid)
      if (x == null) {
        const responseData: HttpErrorResponseBody = {
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.NOT_FOUND].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.NOT_FOUND].displayMsg,
          errorMessage: '-',
        }
        res.status(200).json(responseData)
      } else {
        const responseData: HttpResponseGetOne<XModelInstance> = {
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
  const requestData: HttpCreateOneRequestBody<XModelInstance> = req.body
  // add validations for body
  const validation: ValidationResult = validateX(requestData.data)

  if (!validation.isValid) {
    invalidRequest(res, validation.message)
  } else {
    try {
      const x: XModelInstance | null = await X.create(requestData.data)
      if (x == null) {
        const responseData: HttpErrorResponseBody = {
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_CREATING].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_CREATING].displayMsg,
          errorMessage: '-',
        }
        res.status(200).json(responseData)
      } else {
        const responseData: HttpResponseCreateOne<XModelInstance> = {
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
  const requestData: HttpUpdateOneRequestBody<XModelInstance> = req.body
  // add validations for body
  const validation: ValidationResult = validateX(requestData.data)

  if (!validation.isValid) {
    invalidRequest(res, validation.message)
  } else {
    try {
      const x: [affectedcount: number] = await X.update(requestData.data, {
        where: {
          uid: requestData.data.uid,
        },
      })
      const updatedX: XModelInstance | null = await X.findByPk(requestData.data.uid)
      if (x == null) {
        const responseData: HttpErrorResponseBody = {
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_UPDATING_DATA].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_UPDATING_DATA].displayMsg,
          errorMessage: '-',
        }
        res.status(200).json(responseData)
      } else {
        const responseData: HttpResponseCreateOne<XModelInstance> = {
          data: updatedX,
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

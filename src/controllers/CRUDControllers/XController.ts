import express, { Request, Response } from 'express'
import { X, XModelInstance, validateX } from '../../database/models/table_x'
import { validateuid } from '../../services/basicValidators'
import { invalidRequest } from '../../services/errorHandling'
import { API_RESPONSE_CODE, HTTP_OPERATION } from '../../types/enums'
import {
  HttpCreateOneRequestBody,
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
  const requestData: HttpGetAllRequestBody<XModelInstance> = req.body
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
        responseCode: API_RESPONSE_CODE.SUCCESS,
        totalCount: xListCount,
      }
      res.status(200).json(responseData)
    } catch (error: unknown) {
      res.status(500).json({ responseCode: API_RESPONSE_CODE.ERROR_RETRIEVING_DATA })
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
      const responseData: HttpResponseGetOne<XModelInstance> = {
        data: x,
        responseCode: x == null ? API_RESPONSE_CODE.NOT_FOUND : API_RESPONSE_CODE.SUCCESS,
      }
      res.status(200).json(responseData)
    } catch (error) {
      res.status(500).json({ responseCode: API_RESPONSE_CODE.ERROR_RETRIEVING_DATA })
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
      const responseData: HttpResponseCreateOne<XModelInstance> = {
        data: x,
        responseCode: x == null ? API_RESPONSE_CODE.ERROR_CREATING : API_RESPONSE_CODE.SUCCESS,
      }
      res.status(200).json(responseData)
    } catch (error) {
      res.status(500).json({ responseCode: API_RESPONSE_CODE.ERROR })
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
      const responseData: HttpResponseCreateOne<XModelInstance> = {
        data: updatedX,
        responseCode: x == null ? API_RESPONSE_CODE.ERROR_CREATING : API_RESPONSE_CODE.SUCCESS,
      }
      res.status(200).json(responseData)
    } catch (error) {
      res.status(500).json({ responseCode: API_RESPONSE_CODE.ERROR })
    }
  }
})

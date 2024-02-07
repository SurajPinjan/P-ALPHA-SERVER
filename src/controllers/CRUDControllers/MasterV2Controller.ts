import express, { Request, Response } from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOneMaster,
  getCountMaster,
  getOneMaster,
  getallMaster,
  updateOneMaster,
} from '../../database/CRUDServices/MasterCRUDService'
import { MasterModelAttributes, validateMaster } from '../../database/models/table_master'
import { validateuid } from '../../services/basicValidators'
import { invalidRequest } from '../../services/errorHandling'
import { API_RESPONSE_CODE, HTTP_OPERATION } from '../../types/enums'
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

router.post(`/${HTTP_OPERATION.GET_ALL}`, async (req: Request, res: Response) => {
  const requestData: HttpGetAllRequestBody<MasterModelAttributes> = req.body
  // add validations for body
  const _isValid: boolean = true

  if (!_isValid) {
    invalidRequest(res, `request invalid`)
  } else {
    try {
      const xList: MasterModelAttributes[] = await getallMaster(
        requestData.filters,
        requestData.pageSize,
        requestData.pageNumber
      )
      const xListCount: number = await getCountMaster(requestData.filters)
      const responseData: HttpResponseGetAll<MasterModelAttributes> = {
        data: xList,
        responseCode: API_RESPONSE_CODE.SUCCESS,
        totalCount: xListCount,
      }
      res.status(200).json(responseData)
    } catch (error: unknown) {
      if (error instanceof Error)
        res.status(500).json({
          responseCode: API_RESPONSE_CODE.ERROR_RETRIEVING_DATA,
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
      const x: MasterModelAttributes | null = await getOneMaster(requestData.uid)
      const responseData: HttpResponseGetOne<MasterModelAttributes> = {
        data: x,
        responseCode: x == null ? API_RESPONSE_CODE.NOT_FOUND : API_RESPONSE_CODE.SUCCESS,
      }
      res.status(200).json(responseData)
    } catch (error) {
      res.status(200).json({ responseCode: API_RESPONSE_CODE.ERROR_RETRIEVING_DATA })
    }
  }
})

router.post(`/${HTTP_OPERATION.CREATE_ONE}`, isAuthenticatedAdmin, async (req: Request, res: Response) => {
  const requestData: HttpCreateOneRequestBody<MasterModelAttributes> = req.body
  // add validations for body

  const validation: ValidationResult = validateMaster(requestData.data)

  if (!validation.isValid) {
    invalidRequest(res, validation.message)
  } else {
    try {
      const x: MasterModelAttributes | null = await createOneMaster(requestData.data)
      const responseData: HttpResponseCreateOne<MasterModelAttributes> = {
        data: x,
        responseCode: x == null ? API_RESPONSE_CODE.ERROR_CREATING : API_RESPONSE_CODE.SUCCESS,
      }
      res.status(200).json(responseData)
    } catch (error) {
      console.log(error)
      res.status(200).json({ responseCode: API_RESPONSE_CODE.ERROR })
    }
  }
})

router.post(`/${HTTP_OPERATION.UPDATE_ONE}`, isAuthenticatedAdmin, async (req: Request, res: Response) => {
  const requestData: HttpUpdateOneRequestBody<MasterModelAttributes> = req.body
  const validation: ValidationResult = validateMaster(requestData.data)

  if (!validation.isValid) {
    invalidRequest(res, validation.message)
  } else {
    try {
      const x: MasterModelAttributes | null = await updateOneMaster(requestData.data)
      const responseData: HttpResponseCreateOne<MasterModelAttributes> = {
        data: x,
        responseCode: x == null ? API_RESPONSE_CODE.ERROR_UPDATING_DATA : API_RESPONSE_CODE.SUCCESS,
      }
      res.status(200).json(responseData)
    } catch (error: unknown) {
      if (error instanceof Error)
        res
          .status(500)
          .json({ responseCode: API_RESPONSE_CODE.ERROR, errorMessage: error.message } as HttpErrorResponseBody)
    }
  }
})

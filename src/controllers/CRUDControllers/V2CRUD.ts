import { Request, Response } from 'express'
import { invalidRequest } from '../../services/errorHandling'
import {
  HttpCreateOneRequestBody,
  HttpErrorResponseBody,
  HttpGetAllRequestBody,
  HttpGetOneRequestBody,
  HttpResponseCreateOne,
  HttpResponseGetAll,
  HttpResponseGetOne,
  HttpUpdateOneRequestBody,
  Sort,
} from '../../types/httpTypes'
import { API_RESPONSE_CODE, API_RESPONSE_MAP } from '../../types/enums'
import { Filter } from '../../types/filterTypes'
import { validateuid } from '../../services/basicValidators'
import { ValidationResult } from '../../types/validationTypes'

const getAll = <ModelAttributes>(
  getall: (filters: Filter[], sorts: Sort[], pageSize?: number, pageNumber?: number) => Promise<ModelAttributes[]>,
  getCount: (filters: Filter[]) => Promise<number>
) => {
  return async (req: Request, res: Response) => {
    const requestData: HttpGetAllRequestBody = req.body
    // add validations for body
    const _isValid: boolean = true

    if (!_isValid) {
      invalidRequest(res, `request invalid`)
    } else {
      try {
        const xList: ModelAttributes[] = await getall(
          requestData.filters,
          requestData.sorts,
          requestData.pageSize,
          requestData.pageNumber
        )
        const xListCount: number = await getCount(requestData.filters)
        const responseData: HttpResponseGetAll<ModelAttributes> = {
          data: xList,
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].displayMsg,
          totalCount: xListCount,
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
  }
}

const getOne = <ModelAttributes>(getone: (uid: number) => Promise<ModelAttributes | null>) => {
  return async (req: Request, res: Response) => {
    const requestData: HttpGetOneRequestBody = req.body
    // add validations for body
    let _isValid: boolean = true

    _isValid = _isValid && validateuid(requestData.uid)

    if (!_isValid) {
      invalidRequest(res, `invalid uid`)
    } else {
      try {
        const x: ModelAttributes | null = await getone(requestData.uid)
        if (x == null) {
          const responseData: HttpErrorResponseBody = {
            responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.NOT_FOUND].code,
            displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.NOT_FOUND].displayMsg,
            errorMessage: '-',
          }
          res.status(200).json(responseData)
        } else {
          const responseData: HttpResponseGetOne<ModelAttributes> = {
            data: x,
            responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].code,
            displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].displayMsg,
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
  }
}

const createOne = <ModelAttributes>(
  createone: (data: ModelAttributes) => Promise<ModelAttributes | null>,
  validate: (x: ModelAttributes) => ValidationResult
) => {
  return async (req: Request, res: Response) => {
    const requestData: HttpCreateOneRequestBody<ModelAttributes> = req.body
    // add validations for body

    const validation: ValidationResult = validate(requestData.data)

    if (!validation.isValid) {
      invalidRequest(res, validation.message)
    } else {
      try {
        const x: ModelAttributes | null = await createone(requestData.data)
        if (x == null) {
          const responseData: HttpErrorResponseBody = {
            responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_CREATING].code,
            displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_CREATING].displayMsg,
            errorMessage: '-',
          }
          res.status(200).json(responseData)
        } else {
          const responseData: HttpResponseCreateOne<ModelAttributes> = {
            data: x,
            responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_CREATE].code,
            displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_CREATE].displayMsg,
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
  }
}

const updateOne = <ModelAttributes>(
  updateone: (data: ModelAttributes) => Promise<ModelAttributes | null>,
  validate: (x: ModelAttributes) => ValidationResult
) => {
  return async (req: Request, res: Response) => {
    const requestData: HttpUpdateOneRequestBody<ModelAttributes> = req.body
    const validation: ValidationResult = validate(requestData.data)

    if (!validation.isValid) {
      invalidRequest(res, validation.message)
    } else {
      try {
        const x: ModelAttributes | null = await updateone(requestData.data)
        if (x == null) {
          const responseData: HttpErrorResponseBody = {
            responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_UPDATING_DATA].code,
            displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_UPDATING_DATA].displayMsg,
            errorMessage: '-',
          }
          res.status(200).json(responseData)
        } else {
          const responseData: HttpResponseGetOne<ModelAttributes> = {
            data: x,
            responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_UPDATE].code,
            displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_UPDATE].displayMsg,
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
  }
}

export { getAll, getOne, createOne, updateOne }

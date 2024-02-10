import { UModelAttributes } from '../database/models/table_u'
import { Filter } from './filterTypes'

// request types

export type HttpGetAllRequestBody = {
  isPagination?: boolean
  pageNumber?: number
  pageSize?: number
  filters: Filter[]
}

export type HttpGetOneRequestBody = {
  uid: number
}

export type HttpCreateOneRequestBody<T> = {
  data: T
}

export type HttpUpdateOneRequestBody<T> = {
  data: T
}

// Response types
export type HttpResponseBody = {
  responseCode: string
  displayMsg: string
}

export type HttpUploadResponseBody = HttpResponseBody & {
  url: string
}

export type HttpErrorResponseBody = HttpResponseBody & {
  errorMessage: string
}

export type HttpResponseGetAll<T> = HttpResponseBody & {
  data: T[]
  totalCount: number
}

export type HttpResponseGetOne<T> = HttpResponseBody & {
  data: T | null
}

export type HttpResponseCreateOne<T> = HttpResponseBody & {
  data: T | null
}

// Auth

export type HttpResponseLogin = HttpResponseBody & {
  token: string
  userInfo: UModelAttributes
}

export interface PassportRequest extends Request {
  isAuthenticated: () => boolean
  user: UModelAttributes
}

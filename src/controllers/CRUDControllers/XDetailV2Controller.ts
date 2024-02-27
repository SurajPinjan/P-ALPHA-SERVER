import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOneXDetail,
  getCountXDetail,
  getOneXDetail,
  getallXDetail,
  updateOneXDetail,
} from '../../database/CRUDServices/XDetailCRUDService'
import { XDetailModelAttributes, validateXDetail } from '../../database/models/table_xdetail'
import { HTTP_OPERATION } from '../../types/enums'

import { createOne, getAll, getOne, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(
  `/${HTTP_OPERATION.GET_ALL}`,
  ensureAuthenticated,
  getAll<XDetailModelAttributes>(getallXDetail, getCountXDetail)
)

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<XDetailModelAttributes>(getOneXDetail))

router.post(
  `/${HTTP_OPERATION.CREATE_ONE}`,
  isAuthenticatedAdmin,
  createOne<XDetailModelAttributes>(createOneXDetail, validateXDetail)
)

router.post(
  `/${HTTP_OPERATION.UPDATE_ONE}`,
  isAuthenticatedAdmin,
  updateOne<XDetailModelAttributes>(updateOneXDetail, validateXDetail)
)

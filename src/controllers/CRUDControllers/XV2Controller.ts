import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOneX,
  getCountX,
  getOneFullX,
  getOneX,
  getallX,
  updateOneX,
} from '../../database/CRUDServices/XCRUDService'
import { FullXModelAttributes, XModelAttributes, validateX } from '../../database/models/table_x'
import { HTTP_OPERATION } from '../../types/enums'
import { createOne, getAll, getOne, getOneFull, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, ensureAuthenticated, getAll<XModelAttributes>(getallX, getCountX))

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<XModelAttributes>(getOneX))

router.post(`/${HTTP_OPERATION.GET_ONE_FULL}`, ensureAuthenticated, getOneFull<FullXModelAttributes>(getOneFullX))

router.post(`/${HTTP_OPERATION.CREATE_ONE}`, isAuthenticatedAdmin, createOne<XModelAttributes>(createOneX, validateX))

router.post(`/${HTTP_OPERATION.UPDATE_ONE}`, isAuthenticatedAdmin, updateOne<XModelAttributes>(updateOneX, validateX))

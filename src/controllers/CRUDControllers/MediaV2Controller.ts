import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOneMedia,
  getCountMedia,
  getOneMedia,
  getallMedia,
  updateOneMedia,
} from '../../database/CRUDServices/MediaCRUDService'
import { TableMediaModelAttributes, validateTableMedia } from '../../database/models/table_media'
import { HTTP_OPERATION } from '../../types/enums'

import { createOne, getAll, getOne, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(
  `/${HTTP_OPERATION.GET_ALL}`,
  ensureAuthenticated,
  getAll<TableMediaModelAttributes>(getallMedia, getCountMedia)
)

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<TableMediaModelAttributes>(getOneMedia))

router.post(
  `/${HTTP_OPERATION.CREATE_ONE}`,
  isAuthenticatedAdmin,
  createOne<TableMediaModelAttributes>(createOneMedia, validateTableMedia)
)

router.post(
  `/${HTTP_OPERATION.UPDATE_ONE}`,
  isAuthenticatedAdmin,
  updateOne<TableMediaModelAttributes>(updateOneMedia, validateTableMedia)
)

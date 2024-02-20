import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOneMaster,
  getCountMaster,
  getOneMaster,
  getallMaster,
  updateOneMaster,
} from '../../database/CRUDServices/MasterCRUDService'
import { MasterModelAttributes, validateMaster } from '../../database/models/table_master'
import { HTTP_OPERATION } from '../../types/enums'
import { createOne, getAll, getOne, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(
  `/${HTTP_OPERATION.GET_ALL}`,
  ensureAuthenticated,
  getAll<MasterModelAttributes>(getallMaster, getCountMaster)
)

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<MasterModelAttributes>(getOneMaster))

router.post(
  `/${HTTP_OPERATION.CREATE_ONE}`,
  isAuthenticatedAdmin,
  createOne<MasterModelAttributes>(createOneMaster, validateMaster)
)

router.post(
  `/${HTTP_OPERATION.UPDATE_ONE}`,
  isAuthenticatedAdmin,
  updateOne<MasterModelAttributes>(updateOneMaster, validateMaster)
)

import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOneDefaultPerms,
  getCountDefaultPerms,
  getOneDefaultPerms,
  getallDefaultPerms,
  updateOneDefaultPerms,
} from '../../database/CRUDServices/DefaultPermsCRUDService'
import { DefaultPermsModelAttributes, validateDefaultPerms } from '../../database/models/table_default_perms'
import { HTTP_OPERATION } from '../../types/enums'

import { createOne, getAll, getOne, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(
  `/${HTTP_OPERATION.GET_ALL}`,
  ensureAuthenticated,
  getAll<DefaultPermsModelAttributes>(getallDefaultPerms, getCountDefaultPerms)
)

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<DefaultPermsModelAttributes>(getOneDefaultPerms))

router.post(
  `/${HTTP_OPERATION.CREATE_ONE}`,
  isAuthenticatedAdmin,
  createOne<DefaultPermsModelAttributes>(createOneDefaultPerms, validateDefaultPerms)
)

router.post(
  `/${HTTP_OPERATION.UPDATE_ONE}`,
  isAuthenticatedAdmin,
  updateOne<DefaultPermsModelAttributes>(updateOneDefaultPerms, validateDefaultPerms)
)

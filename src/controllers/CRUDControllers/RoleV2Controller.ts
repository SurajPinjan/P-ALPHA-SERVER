import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOneRole,
  getCountRole,
  getOneRole,
  getallRole,
  updateOneRole,
} from '../../database/CRUDServices/RoleCRUDService'
import { RoleModelAttributes, validateRole } from '../../database/models/table_roles'
import { HTTP_OPERATION } from '../../types/enums'

import { createOne, getAll, getOne, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, ensureAuthenticated, getAll<RoleModelAttributes>(getallRole, getCountRole))

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<RoleModelAttributes>(getOneRole))

router.post(
  `/${HTTP_OPERATION.CREATE_ONE}`,
  isAuthenticatedAdmin,
  createOne<RoleModelAttributes>(createOneRole, validateRole)
)

router.post(
  `/${HTTP_OPERATION.UPDATE_ONE}`,
  isAuthenticatedAdmin,
  updateOne<RoleModelAttributes>(updateOneRole, validateRole)
)

import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOnePermission,
  getCountPermission,
  getOnePermission,
  getallPermission,
  updateOnePermission,
} from '../../database/CRUDServices/PermissionCRUDService'
import { PermissionModelAttributes, validatePermission } from '../../database/models/table_permissions'
import { HTTP_OPERATION } from '../../types/enums'

import { createOne, getAll, getOne, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(
  `/${HTTP_OPERATION.GET_ALL}`,
  ensureAuthenticated,
  getAll<PermissionModelAttributes>(getallPermission, getCountPermission)
)

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<PermissionModelAttributes>(getOnePermission))

router.post(
  `/${HTTP_OPERATION.CREATE_ONE}`,
  isAuthenticatedAdmin,
  createOne<PermissionModelAttributes>(createOnePermission, validatePermission)
)

router.post(
  `/${HTTP_OPERATION.UPDATE_ONE}`,
  isAuthenticatedAdmin,
  updateOne<PermissionModelAttributes>(updateOnePermission, validatePermission)
)

import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import {
  createOneUser,
  getCountUser,
  getOneUser,
  getallUser,
  updateOneUser,
} from '../../database/CRUDServices/UserCRUDService'
import { HTTP_OPERATION } from '../../types/enums'
import { createOne, getAll, getOne, updateOne } from './V2CRUD'
import { UserAttributes, validateUser } from '../../database/models/user'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, ensureAuthenticated, getAll<UserAttributes>(getallUser, getCountUser))

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<UserAttributes>(getOneUser))

router.post(
  `/${HTTP_OPERATION.CREATE_ONE}`,
  isAuthenticatedAdmin,
  createOne<UserAttributes>(createOneUser, validateUser)
)

router.post(
  `/${HTTP_OPERATION.UPDATE_ONE}`,
  isAuthenticatedAdmin,
  updateOne<UserAttributes>(updateOneUser, validateUser)
)

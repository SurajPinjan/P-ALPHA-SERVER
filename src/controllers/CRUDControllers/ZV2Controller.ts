import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import { createOneZ, getCountZ, getOneZ, getallZ, updateOneZ } from '../../database/CRUDServices/ZCRUDService'
import { ZModelAttributes, validateZ } from '../../database/models/table_z'
import { HTTP_OPERATION } from '../../types/enums'

import { createOne, getAll, getOne, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, ensureAuthenticated, getAll<ZModelAttributes>(getallZ, getCountZ))

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<ZModelAttributes>(getOneZ))

router.post(`/${HTTP_OPERATION.CREATE_ONE}`, isAuthenticatedAdmin, createOne<ZModelAttributes>(createOneZ, validateZ))

router.post(`/${HTTP_OPERATION.UPDATE_ONE}`, isAuthenticatedAdmin, updateOne<ZModelAttributes>(updateOneZ, validateZ))

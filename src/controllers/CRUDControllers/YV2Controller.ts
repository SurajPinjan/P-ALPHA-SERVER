import express from 'express'
import { ensureAuthenticated, isAuthenticatedAdmin } from '../../auth/passportConfig'
import { createOneY, getCountY, getOneY, getallY, updateOneY } from '../../database/CRUDServices/YCRUDService'
import { YModelAttributes, validateY } from '../../database/models/table_y'
import { HTTP_OPERATION } from '../../types/enums'

import { createOne, getAll, getOne, updateOne } from './V2CRUD'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ALL}`, ensureAuthenticated, getAll<YModelAttributes>(getallY, getCountY))

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<YModelAttributes>(getOneY))

router.post(`/${HTTP_OPERATION.CREATE_ONE}`, isAuthenticatedAdmin, createOne<YModelAttributes>(createOneY, validateY))

router.post(`/${HTTP_OPERATION.UPDATE_ONE}`, isAuthenticatedAdmin, updateOne<YModelAttributes>(updateOneY, validateY))

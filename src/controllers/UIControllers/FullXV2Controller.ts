import express from 'express'
import { getOneFullX } from '../../database/UIServices/FullXService'
import { HTTP_OPERATION } from '../../types/enums'
import { FullXModelAttributes } from '../../DataTransfer/FullXEntity'
import { ensureAuthenticated } from '../../auth/passportConfig'
import { getOne } from '../CRUDControllers/V2CRUD'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.GET_ONE}`, ensureAuthenticated, getOne<FullXModelAttributes>(getOneFullX))

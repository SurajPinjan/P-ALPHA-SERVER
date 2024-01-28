import { Request, Response, Router } from 'express'

import { ensureAuthenticated } from '../../auth/passportConfig'
import { uploader } from '../../config/multerConfig'
import { invalidRequest } from '../../services/errorHandling'
import { API_RESPONSE_CODE, HTTP_OPERATION } from '../../types/enums'
import { HttpErrorResponseBody, HttpUploadResponseBody } from '../../types/httpTypes'

export const router = Router()

router.post(
  `/${HTTP_OPERATION.UPLOAD}`,
  ensureAuthenticated,
  uploader.single('file'),
  async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File

    // validate if file exists
    const _isValid: boolean = typeof file != 'undefined'

    if (!_isValid) {
      invalidRequest(res, `invalid file`)
    } else {
      try {
        res.status(200).json({
          responseCode: API_RESPONSE_CODE.SUCCESS,
          url: `http://localhost:3000/uploads/${file.originalname}`,
        } as HttpUploadResponseBody)
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({
            responseCode: API_RESPONSE_CODE.ERROR_UPLOADING_FILE,
            errorMessage: error.message,
          } as HttpErrorResponseBody)
        }
      }
    }
  }
)

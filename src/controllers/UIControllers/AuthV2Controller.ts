import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { ensureAuthenticated } from '../../auth/passportConfig'
import { UModelAttributes } from '../../database/models/table_u'
import { API_RESPONSE_CODE, AUTH_STRATEGIES, HTTP_OPERATION } from '../../types/enums'
import { HttpErrorResponseBody, HttpResponseBody, HttpResponseLogin } from '../../types/httpTypes'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.LOGIN}`, async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(AUTH_STRATEGIES.LOCAL.valueOf(), async (err: Error, user: UModelAttributes) => {
    if (err) {
      return res
        .status(400)
        .send({ responseCode: API_RESPONSE_CODE.ERROR, errorMessage: err.message } as HttpErrorResponseBody)
    }
    if (!user) {
      return res.status(400).send({
        responseCode: API_RESPONSE_CODE.NOT_FOUND,
        errorMessage: `Incorrect credentials`,
      } as HttpErrorResponseBody)
    }
    req.logIn(user, (errLogin: Error) => {
      if (errLogin) {
        return res
          .status(400)
          .send({ responseCode: API_RESPONSE_CODE.ERROR, errorMessage: errLogin.message } as HttpErrorResponseBody)
      }

      // res.cookie('XSRF-TOKEN', req.csrfToken());

      return res.status(200).send({
        token: req.sessionID,
        userInfo: user,
        responseCode: API_RESPONSE_CODE.SUCCESS,
      } as HttpResponseLogin)
    })
  })(req, res, next)
})

router.post(`/${HTTP_OPERATION.LOGOUT}`, ensureAuthenticated, (req: Request, res: Response) => {
  req.logout(
    {
      keepSessionInfo: true,
    },
    (err: Error) => {
      if (!err) {
        return res.status(200).send({ responseCode: API_RESPONSE_CODE.SUCCESS } as HttpResponseBody)
      }
    }
  )
})

export default router

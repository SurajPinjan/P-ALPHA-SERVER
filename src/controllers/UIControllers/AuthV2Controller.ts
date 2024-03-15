import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { ensureAuthenticated } from '../../auth/passportConfig'
import { UModelAttributes } from '../../database/models/table_u'
import { API_RESPONSE_CODE, API_RESPONSE_MAP, AUTH_STRATEGIES, HTTP_OPERATION } from '../../types/enums'
import { HttpErrorResponseBody, HttpResponseBody, HttpResponseLogin } from '../../types/httpTypes'
import { loginLDAP } from '../../database/UIServices/LoginService'

export const router = express.Router()

router.post(`/${HTTP_OPERATION.LOGIN}`, async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(AUTH_STRATEGIES.LOCAL.valueOf(), async (err: Error, user: UModelAttributes) => {
    if (err) {
      return res.status(400).send({
        responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR].code,
        displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR].displayMsg,
        errorMessage: err.message,
      } as HttpErrorResponseBody)
    }
    if (!user) {
      return res.status(400).send({
        responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.NOT_FOUND].code,
        displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.NOT_FOUND].displayMsg,
        errorMessage: `Incorrect credentials`,
      } as HttpErrorResponseBody)
    }
    req.logIn(user, (errLogin: Error) => {
      if (errLogin) {
        return res.status(400).send({
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR].displayMsg,
          errorMessage: errLogin.message,
        } as HttpErrorResponseBody)
      }

      // res.cookie('XSRF-TOKEN', req.csrfToken());

      return res.status(200).send({
        token: req.sessionID,
        userInfo: user,
        responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].code,
        displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].displayMsg,
      } as HttpResponseLogin)
    })
  })(req, res, next)
})

router.post(`/${HTTP_OPERATION.LDAP_LOGIN}`, async (req: Request, resposne: Response) => {
  const requestData: { username: string; password: string } = req.body

  return loginLDAP(requestData.username, requestData.password, (err: Error | null) => {
    try {
      if (err !== null) {
        throw err
      } else {
        return resposne.status(200).send({
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.LDAP_LOGIN_SUCCESS].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.LDAP_LOGIN_SUCCESS].displayMsg,
        } as HttpResponseBody)
      }
    } catch (error) {
      if (error instanceof Error)
        return resposne.status(500).json({
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_RETRIEVING_DATA].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_RETRIEVING_DATA].displayMsg,
          errorMessage: error.message,
        } as HttpErrorResponseBody)
    }
  })
})

router.post(`/${HTTP_OPERATION.LOGOUT}`, ensureAuthenticated, (req: Request, res: Response) => {
  req.logout(
    {
      keepSessionInfo: true,
    },
    (err: Error) => {
      if (!err) {
        return res.status(200).send({
          responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].code,
          displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.SUCCESS_GEN].displayMsg,
        } as HttpResponseBody)
      }
    }
  )
})

export default router

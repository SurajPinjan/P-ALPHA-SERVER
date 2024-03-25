import bcrypt from 'bcrypt'
import { NextFunction, Response } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { getUByUsername } from '../database/UIServices/LoginService'
import { UModelAttributes } from '../database/models/table_u'
import { API_RESPONSE_CODE, API_RESPONSE_MAP, USER_ROLES } from '../types/enums'
import { HttpErrorResponseBody, PassportRequest } from '../types/httpTypes'

passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user: UModelAttributes | null = await getUByUsername(username)

      if (!user || user == null) {
        return done(null, false, { message: 'Incorrect username' })
      } else if (user.isDeleted) {
        return done(null, false, { message: 'User Removed' })
      } else if (!bcrypt.compareSync(password, user.passwordHash)) {
        return done(null, false, { message: 'Incorrect password' })
      }
      return done(null, user)
    } catch (error: unknown) {
      if (error instanceof Error) return done(error.message)
    }
  })
)

passport.serializeUser<unknown>((user: unknown, done) => {
  done(null, user)
})

passport.deserializeUser<UModelAttributes>(async (user: UModelAttributes, done) => {
  try {
    done(null, user)
  } catch (error: unknown) {
    if (error instanceof Error) return done(error.message)
  }
})

export function ensureAuthenticated(req: unknown, res: unknown, next: NextFunction) {
  const reqAuth = req as PassportRequest
  const resAuth = res as Response

  if (reqAuth.isAuthenticated()) {
    next()
  } else {
    return resAuth.status(400).send({
      responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_INVALID_TOKEN].code,
      displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_INVALID_TOKEN].displayMsg,
      errorMessage: `Token is invalid`,
    } as HttpErrorResponseBody)
  }
}

export function isAuthenticatedAdmin(req: unknown, res: unknown, next: NextFunction) {
  const reqAuth = req as PassportRequest
  const resAuth = res as Response

  if (!reqAuth.isAuthenticated()) {
    return resAuth.status(400).send({
      responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_INVALID_TOKEN].code,
      displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_INVALID_TOKEN].displayMsg,
      errorMessage: `Token is invalid`,
    } as HttpErrorResponseBody)
  } else if (reqAuth.user.role_name !== USER_ROLES.ADMIN) {
    return resAuth.status(400).send({
      responseCode: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_INVALID_ROLE].code,
      displayMsg: API_RESPONSE_MAP[API_RESPONSE_CODE.ERROR_INVALID_ROLE].displayMsg,
      errorMessage: `Not an admin`,
    } as HttpErrorResponseBody)
  } else {
    next()
  }
}

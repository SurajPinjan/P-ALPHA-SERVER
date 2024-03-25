import { validateName, validatePassword, validateuid } from '../../services/basicValidators'
import { ModelAttributes } from '../../types/databaseTypes'
import { ValidationResult } from '../../types/validationTypes'

export interface UserAttributes extends ModelAttributes, Express.User {
  username: string
  passwordHash: string
  password?: string //transient
  role_id: number | null
}

export const validateUser = function (u: UserAttributes): ValidationResult {
  const validationResult: ValidationResult = { isValid: true, message: `` }

  if (!validateName(u.username)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid username `)
  }

  if (u.passwordHash && !validatePassword(u.passwordHash)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid password `)
  }

  if (u.role_id && !validateuid(u.role_id)) {
    validationResult.isValid = false
    validationResult.message = validationResult.message?.concat(`invalid Role `)
  }

  return validationResult
}

import logger from '../config/winston-config'

const validateuid = function (uid: number): boolean {
  logger.info(`${uid} not used`)
  return true
}

const validatePhone = function (text: string): boolean {
  logger.info(`${text} not used`)
  return true
}

const validateEmail = function (text: string): boolean {
  logger.info(`${text} not used`)
  return true
}

const validateName = function (text: string): boolean {
  logger.info(`${text} not used`)
  return true
}

const validatePassword = function (text: string): boolean {
  logger.info(`${text} not used`)
  return true
}

const validateMillSecDate = function (text: string): boolean {
  logger.info(`${text} not used`)
  return true
}

const validateStringifiedArray = function (text: string): boolean {
  try {
    const parsed = JSON.parse(text) as string[]
    return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')
  } catch (error) {
    return false
  }
}

export {
  validateStringifiedArray,
  validatePhone,
  validateEmail,
  validateName,
  validatePassword,
  validateMillSecDate,
  validateuid,
}

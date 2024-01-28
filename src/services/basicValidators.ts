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

export { validatePhone, validateEmail, validateName, validatePassword, validateMillSecDate, validateuid }

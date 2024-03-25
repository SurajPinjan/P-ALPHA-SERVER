import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const generateSecretKey = function (): string {
  return crypto.randomBytes(32).toString('hex')
}

export const generatePasswordHash = function (password: string): string {
  return bcrypt.hashSync(password, 5)
}

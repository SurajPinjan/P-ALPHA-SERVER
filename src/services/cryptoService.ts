import crypto from 'crypto'

export const generateSecretKey = function (): string {
    return crypto.randomBytes(32).toString('hex');
}
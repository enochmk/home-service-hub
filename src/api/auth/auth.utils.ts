import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { IUserSessionData } from './auth.interface';

const JWT_SECRET = process.env['JWT_SECRET'] || 'secret';
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] || '30m';

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IUserSessionData;
    return decoded;
  } catch (error: any) {
    let { message } = error;
    message = message.includes('jwt expired')
      ? 'Session has expired. Please sign-in again to continue.'
      : message;
    message = message.includes('invalid signature')
      ? 'Invalid signature. Please sign-in again to continue.'
      : message;
    throw new Error(message);
  }
};

export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

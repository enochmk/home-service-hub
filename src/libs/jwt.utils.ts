import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET'] as string;
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] as string;

export interface IPayload {
  user: {
    id: number;
    [key: string]: any;
  };
}

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IPayload;
    return decoded;
  } catch (error: any) {
    let { message } = error;
    message = message.includes('jwt expired')
      ? 'Session has expired. Please login again to continue.'
      : message;
    message = message.includes('invalid signature')
      ? 'Invalid signature. Please login again'
      : message;
    throw new Error(message);
  }
};

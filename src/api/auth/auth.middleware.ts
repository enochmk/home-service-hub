import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { decodeToken } from './auth.utils';

export async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers?.authorization;
  if (!authorization)
    return next(new createHttpError.Unauthorized('Authorization header is required'));

  if (!authorization.startsWith('Bearer'))
    return next(new createHttpError.BadRequest('Invalid authorization header format'));

  try {
    const token = authorization.split(' ')[1];
    const decoded = decodeToken(token);
    res.locals.user = decoded;
    return next();
  } catch (error: any) {
    let { message } = error;
    if (message.includes('jwt expired')) message = 'Token expired. Please login again';
    if (message.includes('invalid signature')) message = 'Invalid token. Please login again';
    if (message.includes('jwt malformed')) message = 'Invalid token. Please login again';
    if (message.includes('jwt not active')) message = 'Token not active. Please login again';
    return next(new createHttpError.Unauthorized(message));
  }
}

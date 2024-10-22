import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import { decodeToken } from '../libs/jwt.utils';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers?.authorization;

  // ! authorization header is not present
  if (!authorization) {
    return next(new createHttpError.Unauthorized('Not authorized. This is a protected route.'));
  }

  // ! authorization header is present but not in the correct format
  if (!authorization.startsWith('Bearer')) {
    return next(new createHttpError.BadRequest('Invalid Authorization'));
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = decodeToken(token);
    res.locals.user = decoded;
    return next();
  } catch (error: any) {
    let { message } = error;

    // ! handle expired token
    if (message.includes('jwt expired')) {
      message = 'Token expired. Please login again';
    }

    // ! handle invalid signature
    if (message.includes('invalid signature')) {
      message = 'Invalid token. Please login again';
    }

    return next(new createHttpError.Unauthorized(message));
  }
};

export default verifyJWT;

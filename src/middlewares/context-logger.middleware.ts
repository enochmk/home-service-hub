import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { IUserSessionData } from '../api/auth/auth.interface';

export default function contextLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = res.locals.user as IUserSessionData;
  if (user) {
    logger.defaultMeta = {
      ...logger.defaultMeta,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  next();
}

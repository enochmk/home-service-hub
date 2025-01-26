import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { decodeToken } from './auth.utils';
import * as model from './auth.model';
import { getLogger } from '../../utils/logger';
import { ROLES } from '../../utils/constants';

const logger = getLogger('AuthMiddleware');

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

// check if user is active, should update password
export async function validateCurrentUser(req: Request, res: Response, next: NextFunction) {
  const userId = res.locals.user?.id;
  logger.verbose(`Validating current user ${userId}...`, { user: res.locals.user });
  if (!userId) return next(new createHttpError.Unauthorized('Invalid token. Please login again'));
  const user = await model.findUserById(userId);
  if (!user) {
    return next(new createHttpError.Unauthorized('User not found'));
  }
  if (!user.active) {
    return next(new createHttpError.Unauthorized('User is not active'));
  }

  logger.verbose(`Checking if user: ${user?.email} should update password...`, { user });
  if (user?.shouldUpdatePassword) {
    return next(
      new createHttpError.Unauthorized('Please update your password before you can proceed'),
    );
  }
  // res.locals.user = user;
  return next();
}

export async function shouldUpdatePassword(req: Request, res: Response, next: NextFunction) {
  const userId = res.locals.user!.id;
  const user = await model.findUserById(userId);
  logger.verbose(`Checking if user: ${user?.email} should update password...`, { user });
  if (user?.shouldUpdatePassword) {
    return next(
      new createHttpError.Unauthorized('Please update your password before you can proceed'),
    );
  }
  // res.locals.user = user;
  return next();
}

export async function checkUserCompanyAssociation(req: Request, res: Response, next: NextFunction) {
  const roleName = res.locals.user!.roleName;
  if (roleName !== ROLES.COMPANY_ADMIN) return next();
  if (!res.locals.company) {
    return next(
      new createHttpError.Forbidden(
        'You are not associated with any company. Please contact admin',
      ),
    );
  }
  return next();
}

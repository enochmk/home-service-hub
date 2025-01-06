import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as model from './users.model';
import { getLogger } from '../../utils/logger';

const logger = getLogger('UsersMiddleware');

export async function checkUserExists(req: Request, res: Response, next: NextFunction) {
  const userIds = [req.params?.userId, req.body?.userId].filter(Boolean);
  logger.verbose('Checking user exists...', userIds);
  if (userIds.length === 0) return next();
  for (const userId of userIds) {
    logger.verbose(`Checking user exists: ${userId}...`);
    const user = await model.findUserById(userId);
    if (!user) {
      return next(new createHttpError.NotFound(`User: ${userId} does not exist`));
    }
  }
  return next();
}

export async function checkEmailExists(req: Request, res: Response, next: NextFunction) {
  if (!req.body.email) return next();
  logger.verbose('Checking email exists...');
  const email = req.body.email;
  const user = await model.findUserByEmail(email);
  if (user) {
    return next(new createHttpError.BadRequest(`Email: ${email} is already in use`));
  }
  res.locals.targetUser = user;
  return next();
}

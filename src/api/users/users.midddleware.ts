import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as model from './users.model';

export async function checkUserExists(req: Request, res: Response, next: NextFunction) {
  const userIds = [req.params?.userId, req.body?.userId].filter(Boolean);
  if (userIds.length === 0) return next();
  for (const userId of userIds) {
    const user = await model.findUserById(userId);
    if (!user) {
      throw new createHttpError.NotFound(`User:${userId} does not exist`);
    }
  }
  return next();
}

export async function checkEmailExists(req: Request, res: Response, next: NextFunction) {
  if (!req.body.email) return next();
  const email = req.body.email;
  const user = await model.findUserByEmail(email);
  if (user) {
    throw new createHttpError.BadRequest(`Email:${email} is already in use`);
  }
  res.locals.targetUser = user;
  return next();
}

import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as model from './users.model';

export async function verifyUserExists(req: Request, _res: Response, next: NextFunction) {
  const userId = req.params.userId;
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('This user does not exist');
  }
  return next();
}

export async function verifyEmailAvailability(req: Request, _res: Response, next: NextFunction) {
  if (!req.body.email) return next();
  const email = req.body.email;
  const user = await model.findUserByEmail(email);
  if (user) {
    throw new createHttpError.BadRequest('This email is already in use');
  }
  return next();
}

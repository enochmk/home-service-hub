import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as model from './roles.model';

export async function verifyRoleExists(req: Request, _res: Response, next: NextFunction) {
  const roleId = req.params?.roleId || req.body?.roleId;
  const role = await model.findRoleById(roleId);
  if (!role) {
    throw new createHttpError.NotFound('This role does not exist');
  }
  return next();
}
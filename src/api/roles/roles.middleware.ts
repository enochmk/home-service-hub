import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as model from './roles.model';

export async function verifyRoleExists(req: Request, _res: Response, next: NextFunction) {
  const roleIds = [req.params?.roleId, req.body?.roleId].filter(Boolean); // Remove falsy values
  if (roleIds.length === 0) return next();

  await Promise.all(
    roleIds.map(async (roleId) => {
      const role = await model.findRoleById(roleId);
      if (!role) {
        throw new createHttpError.NotFound(`Role with ID ${roleId} does not exist`);
      }
    }),
  );

  return next();
}

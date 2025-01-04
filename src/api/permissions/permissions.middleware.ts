import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ROLES } from '../../utils/constants';

export function checkPermission(permissions: string | string[]) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!user || !user.role || !user.role.permissions) {
      return next(new createHttpError.Forbidden('Access denied. Permission required.'));
    }

    // bypass if user is admin
    if (user.role.name === ROLES.ADMIN) return next();

    // ensure permissions is an array
    const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];

    // check if user has all required permissions
    const hasAllPermissions = requiredPermissions.every((permission) =>
      user.role.permissions.some((perm: any) => perm.name === permission),
    );

    if (!hasAllPermissions) {
      return next(new createHttpError.Forbidden('Access denied. Permission required.'));
    }

    next();
  };
}

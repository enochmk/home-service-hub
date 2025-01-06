import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ROLES } from '../../utils/constants';
import { IUserSessionData } from '../auth/auth.interface';

export function checkPermission(permissions: string | string[]) {
  return (_req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user as IUserSessionData;
    if (!user || !user.roleId || !user?.permissions) {
      return next(new createHttpError.Forbidden('Access denied. Permission required'));
    }

    // bypass if user is admin
    if (user.roleName === ROLES.TECH_ADMIN) return next();

    // ensure permissions is an array
    const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];

    // check if user has all required permissions
    const hasAllPermissions = requiredPermissions.every((permission) =>
      user.permissions.some((perm) => perm === permission),
    );

    if (!hasAllPermissions) {
      return next(
        new createHttpError.Forbidden(
          'Access denied. You do not have permission to perform this action.',
        ),
      );
    }

    next();
  };
}

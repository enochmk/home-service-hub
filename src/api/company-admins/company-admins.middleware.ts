import { NextFunction, Request, Response } from 'express';
import * as userModel from '../users/users.model';
import * as model from './company-admins.model';
import createHttpError from 'http-errors';
import { ROLES } from '../../utils/constants';

export const isUserCompanyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const adminUserId = req.body.userId;
  const adminUser = await userModel.findUserById(adminUserId);
  if (!adminUser) {
    return next(new createHttpError.NotFound('User not found'));
  }

  if (adminUser.role.name !== ROLES.COMPANY_ADMIN) {
    return next(new createHttpError.BadRequest('This user is not a company admin.'));
  }

  return next();
};

export const checkIfUserIsNotAdded = async (req: Request, res: Response, next: NextFunction) => {
  const adminUserId = req.body.userId;
  const companyId = req.params.companyId;
  const adminUser = await model.findCompanyAdminByCompanyIdAndUserId(companyId, adminUserId);
  if (adminUser) {
    return next(new createHttpError.Conflict('This user is already a company admin.'));
  }
  return next();
};

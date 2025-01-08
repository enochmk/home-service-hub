import { NextFunction, Request, Response } from 'express';
import * as userModel from '../users/users.model';
import * as model from './company-admins.model';
import createHttpError from 'http-errors';
import { ROLES } from '../../utils/constants';
import { getLogger } from '../../utils/logger';

const logger = getLogger('CompanyAdminsMiddleware');

export const isUserCompanyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const adminUserId = req.body.userId;
  logger.verbose(`Checking if user is a company admin ${adminUserId}`, { adminUserId });
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
  logger.verbose(`Checking if user: ${adminUserId} is not added to company: ${adminUserId}`);
  const adminUser = await model.findCompanyAdminByCompanyIdAndUserId(companyId, adminUserId);
  if (adminUser) {
    return next(new createHttpError.Conflict('This user is already a company admin.'));
  }
  return next();
};

export const checkIfUserIsAdded = async (req: Request, res: Response, next: NextFunction) => {
  const adminUserId = req.params.userId || req.body.userId;
  const companyId = req.params.companyId;
  logger.verbose(`Checking if user: ${adminUserId} is added to company: ${companyId}`);
  const adminUser = await model.findCompanyAdminByCompanyIdAndUserId(companyId, adminUserId);
  if (!adminUser) {
    return next(new createHttpError.Conflict('This user is not added to this company'));
  }
  return next();
};

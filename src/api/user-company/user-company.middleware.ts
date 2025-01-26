import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import * as userModel from '../users/users.model';
import * as model from './user-company.model';
import { ROLES } from '../../utils/constants';
import { getLogger } from '../../utils/logger';
import { IUserSessionData } from '../auth/auth.interface';

const logger = getLogger('CompanyAdminsMiddleware');

export const isEligibleForCompanyJoin = async (req: Request, res: Response, next: NextFunction) => {
  const targertUserId = req.body.userId;
  logger.verbose(`Checking if user's role can join a company ${targertUserId}`);
  const foundUser = await userModel.findUserById(targertUserId);
  if (!foundUser) {
    return next(new createHttpError.NotFound('User not found'));
  }
  const SUPPORTED_ROLES: string[] = [ROLES.COMPANY_ADMIN, ROLES.COMPANY_STAFF];
  if (!SUPPORTED_ROLES.includes(foundUser.role.name)) {
    return next(new createHttpError.BadRequest('User role is not allowed to join a company'));
  }
  return next();
};

export const checkIfUserIsNotAdded = async (req: Request, res: Response, next: NextFunction) => {
  const adminUserId = req.body.userId;
  const companyId = req.params.companyId;
  logger.verbose(`Checking if user: ${adminUserId} is not added to company: ${adminUserId}`);
  const adminUser = await model.findCompanyUserByCompanyIdAndUserId(companyId, adminUserId);
  if (adminUser) {
    return next(new createHttpError.Conflict('This user is already a company admin.'));
  }
  return next();
};

export const checkIfUserIsAdded = async (req: Request, res: Response, next: NextFunction) => {
  const adminUserId = req.params.userId || req.body.userId;
  const companyId = req.params.companyId;
  logger.verbose(`Checking if user: ${adminUserId} is added to company: ${companyId}`);
  const adminUser = await model.findCompanyUserByCompanyIdAndUserId(companyId, adminUserId);
  if (!adminUser) {
    return next(new createHttpError.Conflict('This user is not added to this company'));
  }
  return next();
};

export const loadCompanies = async (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user as IUserSessionData;
  const userId = user.id;
  const roleName = user.roleName;
  if (roleName !== ROLES.COMPANY_ADMIN) return next();
  logger.verbose('Loading companies for company admin', { userId });
  const companyAdmin = await model.findCompanyUserByUserId(userId);
  res.locals.user!.company = companyAdmin?.company;
  res.locals.company = companyAdmin?.company;
  return next();
};

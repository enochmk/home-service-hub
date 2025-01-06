import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import * as model from './company-staff.model';
import * as userModel from '../users/users.model';
import { ROLES } from '../../utils/constants';
import { getLogger } from '../../utils/logger';

const logger = getLogger('CompanyStaffMiddleware');

export const checkIfUserIsCompanyStaff: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  logger.verbose('Checking if user is company staff...', { userId });
  const user = await userModel.findUserById(userId);
  if (!user) {
    return next(new createHttpError.NotFound('User not found'));
  }
  if (user.role.name !== ROLES.COMPANY_STAFF) {
    return next(new createHttpError.BadRequest('User is not a company staff'));
  }
  return next();
};

export const checkIfUserNotAdded: RequestHandler = async (req, res, next) => {
  const { companyId, userId } = req.params;
  logger.verbose('Checking if user is not added to company...', { companyId, userId });
  const companyStaff = await model.getCompanyStaffByUserId(companyId, userId);
  if (companyStaff) {
    return next(new createHttpError.Conflict('This Company staff already exists'));
  }
  return next();
};

export const checkIfUserAdded: RequestHandler = async (req, res, next) => {
  const { companyId, userId } = req.params;
  logger.verbose('Checking if user is added to company...', { companyId, userId });
  const companyStaff = await model.getCompanyStaffByUserId(companyId, userId);
  if (!companyStaff) {
    return next(new createHttpError.NotFound('This Company staff not found'));
  }
  return next();
};

export const checkUserNotAddedByEmail: RequestHandler = async (req, res, next) => {
  logger.verbose('Checking if user is not added to company by email...', {
    companyId: req.params.companyId,
    email: req.body.email,
  });
  const companyStaff = await model.getCompanyStaffByEmail(req.params.companyId, req.body.email);
  if (companyStaff) {
    return next(new createHttpError.Conflict('This Company staff already exists'));
  }
  return next();
};

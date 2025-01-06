import { RequestHandler } from 'express';
import * as model from './company-staff.model';
import * as userModel from '../users/users.model';
import createHttpError from 'http-errors';
import { ROLES } from '../../utils/constants';

export const validateCompanyStaff: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  const user = await userModel.findUserById(userId);
  if (!user) {
    return next(new createHttpError.NotFound('User not found'));
  }
  if (user.role.name !== ROLES.COMPANY_STAFF) {
    return next(new createHttpError.BadRequest('User is not a company staff'));
  }
};

export const checkCompanyStaffExists: RequestHandler = async (req, res, next) => {
  const { companyId, userId } = req.params;
  const companyStaff = await model.getCompanyStaffByUserId(companyId, userId);
  if (!companyStaff) {
    return next(new createHttpError.NotFound('This Company staff not found'));
  }
  return next();
};

export const checkStaffAlreadyExists: RequestHandler = async (req, res, next) => {
  const { companyId, userId } = req.params;
  const companyStaff = await model.getCompanyStaffByUserId(companyId, userId);
  if (companyStaff) {
    return next(new createHttpError.Conflict('This Company staff already exists'));
  }
  return next();
};

export const checkStaffAlreadyExistsByEmail: RequestHandler = async (req, res, next) => {
  const { companyId } = req.params;
  const { email } = req.body;
  const companyStaff = await model.getCompanyStaffByEmail(companyId, email);
  if (companyStaff) {
    return next(new createHttpError.Conflict('This Company staff already exists'));
  }
  return next();
};

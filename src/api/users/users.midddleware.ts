import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as model from './users.model';
import { getLogger } from '../../utils/logger';
import { ROLES } from '../../utils/constants';
import { CreateUserRequest } from './users.schema';

const logger = getLogger('UsersMiddleware');

export async function checkUserExists(req: Request, res: Response, next: NextFunction) {
  const userIds = [req.params?.userId, req.body?.userId].filter(Boolean);
  logger.verbose('Checking user exists...', userIds);
  if (userIds.length === 0) return next();
  for (const userId of userIds) {
    logger.verbose(`Checking user exists: ${userId}...`);
    const user = await model.findUserById(userId);
    if (!user) {
      return next(new createHttpError.NotFound(`User: ${userId} does not exist`));
    }
  }
  return next();
}

export async function checkEmailExists(req: Request, res: Response, next: NextFunction) {
  if (!req.body.email) return next();
  logger.verbose('Checking email exists...');
  const email = req.body.email;
  const user = await model.findUserByEmail(email);
  if (user) {
    return next(new createHttpError.BadRequest(`Email: ${email} is already in use`));
  }
  res.locals.targetUser = user;
  return next();
}

export async function isUserPartOfAdminCompany(req: Request, res: Response, next: NextFunction) {
  if (res.locals.user.roleName !== ROLES.COMPANY_ADMIN) return next();
  const companyId = res.locals.company.id;
  if (!companyId) return next();
  const targetUserId = req.params.userId;
  logger.verbose(`Checking user belongs to admin's company...`, { targetUserId, companyId });
  const targetUser = await model.findUserById(targetUserId);
  const isCompanyMember =
    targetUser?.companyAdmins?.[0]?.companyId === companyId ||
    targetUser?.companyStaffs?.[0]?.companyId === companyId;
  if (!isCompanyMember)
    return next(new createHttpError.BadRequest('This user does not belong to your company'));
  return next();
}

export const authorizeCreateUser: CreateUserRequest = async (req, res, next) => {
  const roleName = res.locals.user.roleName;
  if (roleName === ROLES.COMPANY_ADMIN) {
    const companyId = res.locals.company.id;
    const roleId = req.body.roleId;
    const role = await model.findRoleById(roleId);
    if (!role) {
      return next(new createHttpError.BadRequest(`Role with ID ${roleId} does not exist`));
    }
    if (role.name === ROLES.TECH_ADMIN) {
      return next(new createHttpError.BadRequest('You cannot create a tech admin'));
    }
    req.body.companyId = companyId;
    return next();
  }

  if (roleName !== ROLES.TECH_ADMIN) {
    return next(new createHttpError.Forbidden('You are not authorized to create a user'));
  }

  return next();
};

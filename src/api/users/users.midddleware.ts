import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import * as model from './users.model';
import { getLogger } from '../../utils/logger';
import { ROLES } from '../../utils/constants';
import { CreateUserInput } from './users.schema';

const logger = getLogger('UsersMiddleware');

export async function checkUserExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userIds = [req.params?.userId, req.body?.userId].filter(Boolean);
  logger.verbose('Acquiring target user Ids...', { userIds });

  // Check if user exists
  if (userIds.length !== 0) {
    for (const userId of userIds) {
      logger.verbose(`Checking user exists: ${userId}...`);
      const user = await model.findUserById(userId);
      // ! If user does not exist, return 404
      if (!user) {
        return next(
          new createHttpError.NotFound(`User: ${userId} does not exist`),
        );
      }
    }
  }

  return next();
}

export async function checkEmailAvailability(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.verbose('Checking email exists is already in use...', {
    email: req.body.email,
  });
  if (req.body.email) {
    const email = req.body.email;
    const user = await model.findUserByEmail(email);
    if (user) {
      return next(
        new createHttpError.Conflict(`Email: ${email} is already in use`),
      );
    }
  }
  return next();
}

export async function isPartOfAdminCompany(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction,
) {
  if (res.locals.user?.roleName === ROLES.COMPANY_ADMIN) {
    if (!res.locals.company!.id) {
      return next();
    }
    const companyId = res.locals.company!.id;
    const targetUserId = parseInt(req.params.userId);
    logger.verbose(
      "Checking if target user belongs to current user's company...",
    );
    const targetUser = await model.findUserById(targetUserId);
    const isMemberOfCompany = targetUser?.userCompany?.companyId === companyId;
    // ! If user does not belong to company, return 403
    if (!isMemberOfCompany) {
      return next(
        new createHttpError.Forbidden(
          'This user does not belong to your company',
        ),
      );
    }
  }
  return next();
}

export async function authorizeCreateUser(
  req: Request<any, any, CreateUserInput>,
  res: Response,
  next: NextFunction,
) {
  // Check if user is a company admin
  if (res.locals.user?.roleName === ROLES.COMPANY_ADMIN) {
    const roleId = req.body.roleId;
    const role = await model.findRoleById(roleId);
    // Check if role exists
    if (!role) {
      return next(
        new createHttpError.NotFound(`Role with ID ${roleId} does not exist`),
      );
    }
    // Check if role is a tech admin
    if (role.name === ROLES.TECH_ADMIN) {
      return next(
        new createHttpError.Forbidden('You cannot create a tech admin'),
      );
    }
    return next();
  }

  // Check if user is a tech admin
  if (res.locals.user?.roleName !== ROLES.TECH_ADMIN) {
    return next(
      new createHttpError.Forbidden('You are not authorized to create a user'),
    );
  }

  return next();
}

export async function checkUserExistsByParam(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Check if user exists
  if (req.params?.userId) {
    const userId = parseInt(req.params.userId);
    logger.verbose(`Checking user exists: ${userId}...`);
    const userFound = await model.findUserById(userId);
    // ! If user does not exist, return 404
    if (!userFound) {
      return next(
        new createHttpError.NotFound(`User: ${userId} does not exist`),
      );
    }
  }
  return next();
}

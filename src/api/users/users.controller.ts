import { RequestHandler } from 'express';
import * as service from './users.service';
import * as model from './users.model';
import {
  ChangeOwnPasswordRequest,
  CreateUserRequest,
  GetUserRequest,
  UpdateUserPasswordRequest,
  UpdateUserRequest,
} from './users.schema';
import { UserQueryOptions } from './users.interface';
import { ROLES } from '../../utils/constants';
import { Prisma } from '@prisma/client';
import { getLogger } from '../../utils/logger';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

const logger = getLogger('UsersController');

export const createUser: CreateUserRequest = async (req, res) => {
  logger.verbose('Creating user...', req.body);
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  const user = await model.createUser({ ...req.body, password: hashPassword });
  logger.info('User created successfully', user);

  // add user to company if company is present in the request
  if (res.locals?.company?.id) {
    const companyId = res.locals.company.id;
    const userId = user.id;
    logger.info('Adding user to company...', { userId, companyId });
    await model.addUserToCompany(userId, companyId);
  }

  res.status(201).json(user);
};

export const getUsers: RequestHandler = async (req, res) => {
  logger.verbose('Fetching users...', req.query);
  const page = parseInt((req.query?.page as string) || '1', 10);
  const limit = parseInt((req.query?.limit as string) || '10', 10);
  const offet = (page - 1) * limit;
  const sort = req.query.sort as 'asc' | 'desc' | undefined;

  let where: Prisma.usersWhereInput | undefined = req.query.q
    ? {
        OR: [
          { firstName: { contains: req.query.q as string, mode: 'insensitive' } },
          { lastName: { contains: req.query.q as string, mode: 'insensitive' } },
          { email: { contains: req.query.q as string, mode: 'insensitive' } },
        ],
      }
    : {};

  // add company filter for company admin to return users of the same company
  if (res.locals.user?.roleName === ROLES.COMPANY_ADMIN) {
    const companyId = res.locals.company?.id;
    where = { ...where, userCompany: { companyId: companyId } };
  }

  const queryOptions: UserQueryOptions = {
    limit: limit,
    sort: sort || 'asc',
    offset: offet,
    filters: where,
  };

  const data = await model.findUsers(queryOptions);
  const totalCount = await model.getUserCount(queryOptions);
  const totalPages = Math.ceil(Number(totalCount) / limit);
  const response = { pagination: { page, limit, totalPages, totalCount }, data };
  logger.info('Users fetched successfully', response);
  res.status(200).json(response);
};

export const getUserById: GetUserRequest = async (req, res) => {
  logger.verbose('Fetching user...', req.params);
  const userId = req.params.id as string;
  let where: Prisma.usersWhereInput = { id: userId };

  // add company filter for company admin to return users of the same company
  if (res.locals.user?.roleName === ROLES.COMPANY_ADMIN) {
    const companyId = res.locals.company?.id;
    where = { ...where, userCompany: { companyId: companyId } };
  }

  const user = await model.findUser({ filters: where });

  // check if user is not found
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
};

export const updateUserById: UpdateUserRequest = async (req, res) => {
  const user = await model.updateUser(req.params.userId, req.body);
  res.status(200).json(user);
};

export const deleteUserById: GetUserRequest = async (req, res) => {
  await service.deleteUser(req.params.userId);
  res.status(204).send();
};

export const getProfile: RequestHandler = async (req, res) => {
  const user = await service.getProfile(res.locals.user!.id);
  res.status(200).json(user);
};

export const getUserPermissionsByRoleId: RequestHandler = async (req, res) => {
  const permissions = await service.getUserPermissionsByRoleId(res.locals.user!.roleId);
  res.status(200).json({ permissions });
};

export const changeOwnPassword: ChangeOwnPasswordRequest = async (req, res) => {
  const userId = res.locals.user!.id;
  await service.changeOwnPassword(userId, req.body.oldPassword, req.body.newPassword);
  res.status(204).send();
};

export const updateUserPasswordByUserId: UpdateUserPasswordRequest = async (req, res) => {
  await service.updateUserPassword(req.params.userId, req.body.password);
  res.status(204).send();
};

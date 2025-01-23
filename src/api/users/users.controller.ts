import { RequestHandler } from 'express';
import * as service from './users.service';
import {
  ChangeOwnPasswordRequest,
  CreateUserRequest,
  GetUserRequest,
  UpdateUserPasswordRequest,
  UpdateUserRequest,
} from './users.schema';
import { UserQueryOptions } from './users.interface';
import { ROLES } from '../../utils/constants';

export const getUsers: RequestHandler = async (req, res) => {
  const offet =
    (parseInt((req.query?.page as string) || '1', 10) - 1) *
    parseInt((req.query.limit as string) || '10', 10);

  const queryOptions: UserQueryOptions = {
    limit: req.query?.limit ? parseInt(req.query.limit as string, 10) : 10,
    sort: req.query?.sort === 'asc' || req.query?.sort === 'desc' ? req.query.sort : 'asc',
    offset: offet,
    filters: req.query.q
      ? {
          OR: [
            { firstName: { contains: req.query.q as string, mode: 'insensitive' } },
            { lastName: { contains: req.query.q as string, mode: 'insensitive' } },
            { email: { contains: req.query.q as string, mode: 'insensitive' } },
          ],
        }
      : undefined,
  };

  // add company filter for company admin to return users of the same company
  const roleName = res.locals.user.roleName;
  if (roleName === ROLES.COMPANY_ADMIN) {
    const companyId = res.locals?.company?.id;
    queryOptions.filters = {
      ...queryOptions.filters,
      OR: [
        ...(queryOptions.filters?.OR || []),
        {
          companyStaffs: {
            some: {
              companyId: companyId,
            },
          },
        },
        {
          companyAdmins: {
            some: {
              companyId: companyId,
            },
          },
        },
      ],
    };
  }

  const response = await service.getUsers(queryOptions);
  res.status(200).json(response);
};

export const getUserById: GetUserRequest = async (req, res) => {
  const user = await service.getUser(req.params.userId);
  res.status(200).json(user);
};

export const createUser: CreateUserRequest = async (req, res) => {
  const user = await service.createUser(req.body);
  res.status(201).json(user);
};

export const updateUserById: UpdateUserRequest = async (req, res) => {
  const user = await service.updateUser(req.params.userId, req.body);
  res.status(200).json(user);
};

export const deleteUserById: GetUserRequest = async (req, res) => {
  await service.deleteUser(req.params.userId);
  res.status(204).send();
};

export const getProfile: RequestHandler = async (req, res) => {
  const user = await service.getProfile(res.locals.user.id);
  res.status(200).json(user);
};

export const getUserPermissionsByRoleId: RequestHandler = async (req, res) => {
  const permissions = await service.getUserPermissionsByRoleId(res.locals.user.roleId);
  res.status(200).json({ permissions });
};

export const changeOwnPassword: ChangeOwnPasswordRequest = async (req, res) => {
  const userId = res.locals.user.id;
  await service.changeOwnPassword(userId, req.body.oldPassword, req.body.newPassword);
  res.status(204).send();
};

export const updateUserPasswordByUserId: UpdateUserPasswordRequest = async (req, res) => {
  await service.updateUserPassword(req.params.userId, req.body.password);
  res.status(204).send();
};

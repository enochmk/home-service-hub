import { RequestHandler } from 'express';
import * as service from './users.service';
import {
  ChangeOwnPasswordRequest,
  CreateUserRequest,
  GetUserRequest,
  UpdateUserPasswordRequest,
  UpdateUserRequest,
} from './users.schema';
import { FindUsersParams } from './users.interface';

export const createUser: CreateUserRequest = async (req, res) => {
  const user = await service.createUser(req.body);
  res.status(201).json(user);
};

export const updateUser: UpdateUserRequest = async (req, res) => {
  const user = await service.updateUser(req.params.userId, req.body);
  res.status(200).json(user);
};

export const getUser: GetUserRequest = async (req, res) => {
  const user = await service.getUser(req.params.userId);
  res.status(200).json(user);
};

export const getUsers: RequestHandler = async (req, res) => {
  const filter: FindUsersParams = req.query;
  const response = await service.getUsers(filter);
  res.status(200).json(response);
};

export const deleteUser: GetUserRequest = async (req, res) => {
  await service.deleteUser(req.params.userId);
  res.status(204).send();
};

export const getProfile: RequestHandler = async (req, res) => {
  const user = await service.getProfile(res.locals.user.id);
  res.status(200).json(user);
};

export const getUserPermissions: RequestHandler = async (req, res) => {
  const permissions = await service.getUserPermissionsByRoleId(res.locals.user.roleId);
  res.status(200).json({ permissions });
};

export const changeOwnPassword: ChangeOwnPasswordRequest = async (req, res) => {
  const userId = res.locals.user.id;
  await service.changeOwnPassword(userId, req.body.oldPassword, req.body.newPassword);
  res.status(204).send();
};

export const updateUserPassword: UpdateUserPasswordRequest = async (req, res) => {
  await service.updateUserPassword(req.params.userId, req.body.password);
  res.status(204).send();
};

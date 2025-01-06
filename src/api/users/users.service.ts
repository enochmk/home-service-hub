import _ from 'lodash';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { CreateUserInput, UpdateUserInput } from './users.schema';
import * as model from './users.model';
import * as roleModel from '../roles/roles.model';
import { FindUsersParams } from './users.interface';

export const getUser = async (userId: string) => {
  const user = await model.findUserById(userId);
  const userWithoutPassword = _.omit(user, 'password');
  return userWithoutPassword;
};

export const getUsers = async (filter?: FindUsersParams) => {
  const users = await model.findUsers(filter);
  return { data: users };
};

export const createUser = async (data: CreateUserInput) => {
  // validate roleId
  const foundRole = await roleModel.findRoleById(data.roleId);
  if (!foundRole) {
    throw new createHttpError.NotFound('This role does not exist');
  }

  const user = await model.createUser(data);
  const userWithoutPassword = _.omit(user, 'password');
  return userWithoutPassword;
};

export const updateUser = async (userId: string, data: UpdateUserInput) => {
  if (data?.roleId) {
    const foundRole = await roleModel.findRoleById(data.roleId);
    if (!foundRole) {
      throw new createHttpError.NotFound('This role does not exist');
    }
  }
  const user = await model.updateUser(userId, data);
  const userWithoutPassword = _.omit(user, 'password');
  return userWithoutPassword;
};

export const deleteUser = async (userId: string) => {
  return model.deleteUser(userId);
};

export const getProfile = async (userId: string) => {
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  // remove the password, updatedAt from the response
  const userWithoutPassword = _.omit(user, ['password', 'roleId']);
  return userWithoutPassword;
};

export const getUserPermissionsByRoleId = async (roleId: string) => {
  return model.getPermissionsByRoleId(roleId);
};

export const updateUserPassword = async (userId: string, password: string) => {
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  await model.updatePassword(userId, hashPassword);
  return {
    message: `User's Password update successfully`,
  };
};

export const changeOwnPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  if (!bcrypt.compareSync(oldPassword, user.password)) {
    throw new createHttpError.BadRequest('Invalid credentials');
  }

  const hashPassword = bcrypt.hashSync(newPassword, 10);
  await model.updatePassword(userId, hashPassword);
  return {
    message: `Password update successfully`,
  };
};

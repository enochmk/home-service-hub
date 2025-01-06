import _ from 'lodash';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { CreateUserInput, UpdateUserInput } from './users.schema';
import * as model from './users.model';
import { FindUsersParams } from './users.interface';
import { getLogger } from '../../utils/logger';

const logger = getLogger('UsersService');

export const getUsers = async (filter?: FindUsersParams) => {
  logger.verbose('Fetching users...', filter);
  const users = await model.findUsers(filter);
  logger.info('Users fetched successfully', users);
  return { data: users };
};

export const getUser = async (userId: string) => {
  logger.verbose('Fetching user...', { userId });
  const user = await model.findUserById(userId);
  const userWithoutPassword = _.omit(user, 'password');
  logger.info('User fetched successfully', { userWithoutPassword });
  return userWithoutPassword;
};

export const createUser = async (data: CreateUserInput) => {
  logger.verbose('Creating user...', data);
  const user = await model.createUser(data);
  const userWithoutPassword = _.omit(user, 'password');
  logger.info('User created successfully', { userWithoutPassword });
  return userWithoutPassword;
};

export const updateUser = async (userId: string, data: UpdateUserInput) => {
  const user = await model.updateUser(userId, data);
  const userWithoutPassword = _.omit(user, 'password');
  return userWithoutPassword;
};

export const deleteUser = async (userId: string) => {
  logger.verbose('Deleting user...', { userId });
  const response = await model.deleteUser(userId);
  logger.info('User deleted successfully', { userId });
  return response;
};

export const getProfile = async (currentLoggedInUserId: string) => {
  logger.verbose('Fetching user profile...', { currentLoggedInUserId });
  const user = await model.findUserById(currentLoggedInUserId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }
  const userWithoutPassword = _.omit(user, ['password', 'updatedAt']);
  logger.info('User profile fetched successfully', { userWithoutPassword });
  return userWithoutPassword;
};

export const getUserPermissionsByRoleId = async (roleId: string) => {
  logger.verbose('Fetching user permissions', { roleId });
  const response = await model.getPermissionsByRoleId(roleId);
  logger.info('User permissions fetched successfully', { response });
  return response;
};

export const updateUserPassword = async (userId: string, password: string) => {
  logger.verbose('Updating user password...', { userId });
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  await model.updatePassword(userId, hashPassword);
  logger.info('User password updated successfully', { userId });
  return {
    message: `User's Password update successfully`,
  };
};

export const changeOwnPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  logger.verbose('Changing own password...', { userId });
  logger.verbose('Checking user exists...', { userId });
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  logger.verbose('Checking old password...');
  if (!bcrypt.compareSync(oldPassword, user.password)) {
    throw new createHttpError.BadRequest('Invalid credentials');
  }

  const hashPassword = bcrypt.hashSync(newPassword, 10);
  await model.updatePassword(userId, hashPassword);
  logger.info('Password updated successfully', { userId });
  return {
    message: `Password update successfully`,
  };
};

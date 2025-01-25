import _ from 'lodash';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { CreateUserInput, UpdateUserInput } from './users.schema';
import * as model from './users.model';
import { getLogger } from '../../utils/logger';
import { UserQueryOptions } from './users.interface';
import { ROLES } from '../../utils/constants';

const logger = getLogger('UsersService');

export const getUsers = async (queryOptions?: UserQueryOptions) => {
  logger.verbose('Fetching users...');
  const users = await model.findUsers(queryOptions);
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
  const hashPassword = bcrypt.hashSync(data.password, 10);
  const user = await model.createUser({ ...data, password: hashPassword });
  const userWithoutPassword = _.omit(user, 'password');
  logger.info('User created successfully', { userWithoutPassword });
  return userWithoutPassword;
};

export const createUserAsCompanyStaff = async (data: CreateUserInput, companyId: string) => {
  logger.verbose('Creating user as company staff...', { data, companyId });
  const hashPassword = bcrypt.hashSync(data.password, 10);
  const role = await model.findRoleByName(ROLES.COMPANY_STAFF);
  if (!role) throw new createHttpError.NotFound('Role not found');
  // override roleId with company staff role id
  data.roleId = role.id;
  const user = await model.createUser({ ...data, password: hashPassword });
  await model.addUserToCompanyStaff(user.id, companyId);
  const userWithoutPassword = _.omit(user, 'password');
  logger.info('User created as company staff successfully', { userWithoutPassword });
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
  await model.updatePassword(userId, hashPassword, false);
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
  await model.updatePassword(userId, hashPassword, false);
  logger.info('Password updated successfully', { userId });
  return {
    message: `Password update successfully`,
  };
};

export const addUserToCompanyStaff = async (userId: string, companyId: string) => {
  logger.verbose('Adding user to company...', { userId, companyId });
  const user = await model.findUserById(userId);
  if (!user) {
    throw new createHttpError.NotFound('User not found');
  }

  await model.addUserToCompanyStaff(userId, companyId);
  logger.info('User added to company successfully', { userId, companyId });
  return {
    message: 'User added to company successfully',
  };
};

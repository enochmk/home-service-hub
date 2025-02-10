import _ from 'lodash';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { CreateUserInput, UpdateUserInput } from './users.schema';
import * as model from './users.model';
import { getLogger } from '../../utils/logger';
import { UserQueryOptions } from './users.interface';

const logger = getLogger('UsersService');

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

export const getTotalUsers = async (queryOptions?: UserQueryOptions) => {
  logger.verbose('Fetching total users...');
  const totalCount = await model.getUserCount(queryOptions);
  logger.info('Total users fetched successfully', { totalCount });
  return totalCount;
};

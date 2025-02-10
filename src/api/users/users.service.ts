import _ from 'lodash';
import { UpdateUserInput } from './users.schema';
import * as model from './users.model';
import { getLogger } from '../../utils/logger';

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

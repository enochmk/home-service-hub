import { getLogger } from '../../utils/logger';
import * as model from './user-company.model';

const logger = getLogger('UserCompanyService');

export const addUserToCompany = async (companyId: string, userId: string) => {
  logger.verbose('Adding user to company', { companyId, userId });
  const response = await model.addCompanyUser(companyId, userId);
  logger.info('User added to company', { response });
  return response;
};

export const removeUserFromCompany = async (companyId: string, userId: string) => {
  logger.verbose('Removing user from company', { companyId, userId });
  const response = await model.removeUserFromCompany(companyId, userId);
  logger.info('User removed from company', { companyId, userId });
  return response;
};

export const getCompanyUsers = async (companyId: string) => {
  logger.verbose('Fetching users by companyId', { companyId });
  const data = await model.findCompanyUsers(companyId);
  const response = data.map((item) => item.user);
  logger.info('Company Users fetched', response);
  return response;
};

export const getCompanyUserById = async (companyId: string, userId: string) => {
  logger.verbose('Fetching user by userId', { companyId, userId });
  const response = await model.findCompanyUserByCompanyIdAndUserId(companyId, userId);
  logger.info('Company user fetched', response);
  return response;
};

import bcrypt from 'bcrypt';
import { getLogger } from '../../utils/logger';
import * as model from './company-admins.model';
import { AddCompanyAdminInput } from './company-admins.schema';

const logger = getLogger('CompanyAdminsService');

export const addCompanyAdmin = async (companyId: string, data: AddCompanyAdminInput) => {
  const hashPassword = bcrypt.hashSync(data.password, 10);
  logger.verbose('Adding admin to users table', data);
  const adminUser = await model.createUserAsCompanyAdmin({ ...data, password: hashPassword });
  logger.info('Admin added to users table', adminUser);
  logger.verbose('Adding company admin', { companyId, userId: adminUser.id });
  const response = await model.createCompanyAdmin(companyId, adminUser.id);
  logger.info('Company admin added', { companyId, data });
  return response;
};

export const deleteCompanyAdmin = async (companyId: string, userId: string) => {
  logger.verbose('Removing company admin', { companyId, userId });
  const response = await deleteCompanyAdmin(companyId, userId);
  logger.info('Company admin removed', { companyId, userId });
  return response;
};

export const getCompanyAdmins = async (companyId: string) => {
  logger.verbose('Fetching company admins', { companyId });
  const response = await model.findCompanyAdmins(companyId);
  logger.info('Company admins fetched', { companyId });
  return response;
};

export const getCompanyAdminProfile = async (companyId: string, userId: string) => {
  logger.verbose('Fetching company admin profile', { companyId, userId });
  const response = await model.findCompanyAdminProfile(companyId, userId);
  logger.info('Company admin profile fetched', response);
  return response;
};

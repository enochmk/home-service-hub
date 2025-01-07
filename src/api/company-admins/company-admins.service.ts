import { getLogger } from '../../utils/logger';
import * as model from './company-admins.model';

const logger = getLogger('CompanyAdminsService');

export const addCompanyAdmin = async (companyId: string, userId: string) => {
  logger.verbose('Adding company admin', { companyId, userId });
  const response = await model.createCompanyAdmin(companyId, userId);
  logger.info('Company admin added', { response });
  return response;
};

export const removeCompanyAdmin = async (companyId: string, userId: string) => {
  logger.verbose('Removing company admin', { companyId, userId });
  const response = await removeCompanyAdmin(companyId, userId);
  logger.info('Company admin removed', { companyId, userId });
  return response;
};

export const getCompanyAdminsByCompanyId = async (companyId: string) => {
  logger.verbose('Fetching company admins', { companyId });
  const response = await model.findCompanyAdmins(companyId);
  logger.info('Company admins fetched', { companyId });
  return response;
};

export const getCompanyAdminByUserId = async (companyId: string, userId: string) => {
  logger.verbose('Fetching company admin profile', { companyId, userId });
  const response = await model.findCompanyAdminByUserId(companyId, userId);
  logger.info('Company admin fetched', response);
  return response;
};

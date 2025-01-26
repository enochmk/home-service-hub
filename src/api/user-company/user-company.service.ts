import { getLogger } from '../../utils/logger';
import * as model from './user-company.model';

const logger = getLogger('CompanyAdminsService');

export const addCompanyAdmin = async (companyId: string, userId: string) => {
  logger.verbose('Adding company admin', { companyId, userId });
  const response = await model.addCompanyAdmin(companyId, userId);
  logger.info('Company admin added', { response });
  return response;
};

export const removeCompanyAdmin = async (companyId: string, userId: string) => {
  logger.verbose('Removing company admin', { companyId, userId });
  const response = await model.removeAdminFromCompany(companyId, userId);
  logger.info('Company admin removed', { companyId, userId });
  return response;
};

export const getCompanyAdminsByCompanyId = async (companyId: string) => {
  logger.verbose('Fetching company admins', { companyId });
  const data = await model.findCompanyAdmins(companyId);
  const response = data.map((item) => item.user);
  logger.info('Company admins fetched', response);
  return response;
};

export const getCompanyAdminByUserId = async (companyId: string, userId: string) => {
  logger.verbose('Fetching company admin profile', { companyId, userId });
  const response = await model.findCompanyAdminByCompanyIdAndUserId(companyId, userId);
  logger.info('Company admin fetched', response);
  return response;
};

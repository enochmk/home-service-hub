import { getLogger } from '../../utils/logger';
import {
  createCompanyAdmin,
  deleteCompanyAdmin,
  findCompanyAdmins,
  findCompanyAdminProfile,
} from './company-admins.model';

const logger = getLogger('CompanyAdminsService');

export const addCompanyAdmin = async (companyId: string, userId: string) => {
  logger.verbose('Adding company admin', { companyId, userId });
  const response = await createCompanyAdmin(companyId, userId);
  logger.info('Company admin added', { companyId, userId });
  return response;
};

export const removeCompanyAdmin = async (companyId: string, userId: string) => {
  logger.verbose('Removing company admin', { companyId, userId });
  const response = await deleteCompanyAdmin(companyId, userId);
  logger.info('Company admin removed', { companyId, userId });
  return response;
};

export const getCompanyAdmins = async (companyId: string) => {
  logger.verbose('Fetching company admins', { companyId });
  const response = await findCompanyAdmins(companyId);
  logger.info('Company admins fetched', { companyId });
  return response;
};

export const getCompanyAdminProfile = async (companyId: string, userId: string) => {
  logger.verbose('Fetching company admin profile', { companyId, userId });
  const response = await findCompanyAdminProfile(companyId, userId);
  logger.info('Company admin profile fetched', response);
  return response;
};

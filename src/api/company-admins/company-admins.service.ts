import { getLogger } from '../../utils/logger';
import { createCompanyAdmin, deleteCompanyAdmin } from './company-admins.model';

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

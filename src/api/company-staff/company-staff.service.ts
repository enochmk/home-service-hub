import * as model from './company-staff.model';
import { getLogger } from '../../utils/logger';

const logger = getLogger('CompanyStaffService');

export const createCompanyStaff = async (companyId: string, userId: string) => {
  logger.verbose('Adding user to company...', { companyId, userId });
  const response = await model.addCompanyStaff(companyId, userId);
  logger.info('User added to company successfully', response);
  return response;
};

export const removeCompanyStaff = async (companyId: string, userId: string) => {
  logger.verbose('Removing company staff from company...', { companyId, userId });
  const response = await model.removeCompanyStaff(companyId, userId);
  logger.info('Company staff removed successfully', response);
  return response;
};

export const getCompanyStaff = async (companyId: string, userId: string) => {
  logger.verbose('Fetching company staff for company...', { companyId });
  const companyStaff = await model.findCompanyStaffByUserId(companyId, userId);
  logger.info('Company staff fetched successfully', { companyStaff });
  return companyStaff;
};

export const getAllCompanyStaff = async (companyId: string) => {
  logger.verbose('Fetching all company staff for company...', { companyId });
  const response = await model.findCompanyStaffByCompanyId(companyId);
  logger.info('Company staff fetched successfully', response);
  return response;
};

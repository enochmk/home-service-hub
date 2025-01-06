import * as model from './company-staff.model';
import { getLogger } from '../../utils/logger';
import { AddCompanyStaffInput } from './company-staff.schema';

const logger = getLogger('CompanyStaffService');

export const addCompanyStaff = async (companyId: string, data: AddCompanyStaffInput) => {
  logger.verbose('Creating company staff to user table...', data);
  const companyStaff = await model.createUserAsCompanyStaff(data);
  logger.verbose(`Adding company staff to company ${companyId}...`, {
    companyId,
    userId: companyStaff.id,
  });
  const response = await model.addCompanyStaff(companyId, companyStaff.id);
  logger.info('Company staff added successfully', response);
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
  const companyStaff = await model.getCompanyStaffByUserId(companyId, userId);
  logger.info('Company staff fetched successfully', { companyStaff });
  return companyStaff;
};

export const getAllCompanyStaff = async (companyId: string) => {
  logger.verbose('Fetching all company staff for company...', { companyId });
  const response = await model.getCompanyStaffByCompanyId(companyId);
  logger.info('Company staff fetched successfully', response);
  return response;
};

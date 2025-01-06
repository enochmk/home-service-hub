import * as model from './company-staff.model';
import { getLogger } from '../../utils/logger';
import { CreateCompanyStaffInput, UpdateCompanyStaffInput } from './company-staff.schema';

const logger = getLogger('CompanyStaffService');

export const addUserToCompany = async (companyId: string, userId: string) => {
  logger.verbose('Adding user to company...', { companyId, userId });
  const response = await model.addUserToCompany(companyId, userId);
  logger.info('User added to company successfully', response);
  return response;
};

export const createCompanyStaff = async (companyId: string, data: CreateCompanyStaffInput) => {
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

export const deleteCompanyStaff = async (companyId: string, userId: string) => {
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

export const updateCompanyStaff = async (
  companyId: string,
  userId: string,
  data: UpdateCompanyStaffInput,
) => {
  logger.verbose('Updating company staff...', { companyId, userId, data });
  const response = await model.updateCompanyStaff(companyId, userId, data);
  logger.info('Company staff updated successfully', response);
  return response;
};

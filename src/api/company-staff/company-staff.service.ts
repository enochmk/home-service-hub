import createHttpError from 'http-errors';
import * as model from './company-staff.model';
import { getLogger } from '../../utils/logger';

const logger = getLogger('CompanyStaffService');

export const addCompanyStaff = async (companyId: string, userId: string) => {
  logger.verbose('Adding company staff...', { companyId, userId });
  const existingStaff = await model.findCompanyStaff(companyId, userId);
  if (existingStaff) {
    throw new createHttpError.Conflict('User is already a staff member for this company');
  }
  const response = await model.addCompanyStaff(companyId, userId);
  logger.info('Company staff added successfully', response);
  return response;
};

export const removeCompanyStaff = async (companyId: string, userId: string) => {
  logger.verbose('Removing company staff...', { companyId, userId });
  const existingStaff = await model.findCompanyStaff(companyId, userId);
  if (!existingStaff) {
    throw new createHttpError.NotFound('User is not a staff member for this company');
  }
  const response = await model.removeCompanyStaff(companyId, userId);
  logger.info('Company staff removed successfully', response);
  return response;
};

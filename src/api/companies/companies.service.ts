import { getLogger } from '../../utils/logger';
import * as model from './companies.model';
import { CreateCompanyInput, UpdateCompanyInput } from './companies.schema';

const logger = getLogger('CompanyService');

export const getCompanies = async () => {
  logger.verbose('Fetching companies ...');
  const response = await model.getCompanies();
  logger.info('Companies fetched successfully', response);
  return response;
};

export const getCompanyById = async (companyId: string) => {
  logger.verbose(`Fetching company with id ${companyId} ...`);
  const company = await model.findCompanyById(companyId);
  logger.info('Company fetched successfully', company);
  return company;
};

export const createCompany = async (data: CreateCompanyInput) => {
  logger.verbose('Creating company ...', data);
  const response = await model.createCompany(data);
  logger.info('Company created successfully', response);
  return response;
};

export const updateCompany = async (companyId: string, data: UpdateCompanyInput) => {
  logger.verbose(`Updating company with id ${companyId} ...`, data);
  const response = await model.updateCompany(companyId, data);
  logger.info('Company updated successfully', response);
  return response;
};

export const deleteCompany = async (companyId: string) => {
  logger.verbose(`Deleting company with id ${companyId} ...`);
  const response = await model.deleteCompany(companyId);
  logger.info('Company deleted successfully', response);
  return response;
};

import createHttpError from 'http-errors';
import * as model from './companies.model';
import { CreateCompanyRequest, UpdateCompanyRequest } from './companies.schema';

export const createCompany = async (data: CreateCompanyRequest) => {
  return model.createCompany(data);
};

export const updateCompany = async (companyId: string, data: UpdateCompanyRequest) => {
  const existingCompany = await model.findCompanyById(companyId);
  if (!existingCompany) {
    throw new createHttpError.NotFound('Company not found');
  }
  return model.updateCompany(companyId, data);
};

export const deleteCompany = async (companyId: string) => {
  const existingCompany = await model.findCompanyById(companyId);
  if (!existingCompany) {
    throw new createHttpError.NotFound('Company not found');
  }
  return model.deleteCompany(companyId);
};

export const getCompany = async (companyId: string) => {
  const company = await model.findCompanyById(companyId);
  if (!company) {
    throw new createHttpError.NotFound('Company not found');
  }
  return company;
};

export const getCompanies = async () => {
  return model.getCompanies();
};

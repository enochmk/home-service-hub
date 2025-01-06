import * as model from './companies.model';
import { CreateCompanyRequest, UpdateCompanyRequest } from './companies.schema';

export const getCompanies = async () => {
  return model.getCompanies();
};

export const getCompanyById = async (companyId: string) => {
  const company = await model.findCompanyById(companyId);
  return company;
};

export const createCompany = async (data: CreateCompanyRequest) => {
  return model.createCompany(data);
};

export const updateCompany = async (companyId: string, data: UpdateCompanyRequest) => {
  return model.updateCompany(companyId, data);
};

export const deleteCompany = async (companyId: string) => {
  return model.deleteCompany(companyId);
};

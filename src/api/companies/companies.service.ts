import * as model from './companies.model';
import { CreateCompanyInput, UpdateCompanyInput } from './companies.schema';

export const getCompanies = async () => {
  return model.getCompanies();
};

export const getCompanyById = async (companyId: string) => {
  const company = await model.findCompanyById(companyId);
  return company;
};

export const createCompany = async (data: CreateCompanyInput) => {
  return model.createCompany(data);
};

export const updateCompany = async (companyId: string, data: UpdateCompanyInput) => {
  return model.updateCompany(companyId, data);
};

export const deleteCompany = async (companyId: string) => {
  return model.deleteCompany(companyId);
};

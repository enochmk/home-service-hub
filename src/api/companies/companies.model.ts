import prisma from '../../db/prisma.db';
import { CreateCompanyInput, UpdateCompanyInput } from './companies.schema';

export const createCompany = async (data: CreateCompanyInput) => {
  return prisma.company.create({
    data,
  });
};

export const updateCompany = async (companyId: string, data: UpdateCompanyInput) => {
  return prisma.company.update({
    where: { id: companyId },
    data,
  });
};

export const deleteCompany = async (companyId: string) => {
  return prisma.company.delete({
    where: { id: companyId },
  });
};

export const findCompanyById = async (companyId: string) => {
  return prisma.company.findUnique({
    where: { id: companyId },
  });
};

export const getCompanies = async () => {
  return prisma.company.findMany();
};

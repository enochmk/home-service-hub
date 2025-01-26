import prisma from '../../db/prisma.db';
import { companySelect } from './companies.interface';
import { CreateCompanyInput, UpdateCompanyInput } from './companies.schema';

export const createCompany = async (data: CreateCompanyInput, createdByUserId: string) => {
  return prisma.company.create({
    data: { ...data, createdById: createdByUserId },
    select: companySelect,
  });
};

export const updateCompany = async (companyId: string, data: UpdateCompanyInput) => {
  return prisma.company.update({
    where: { id: companyId },
    data,
    select: companySelect,
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
    select: companySelect,
  });
};

export const findCompanyByName = async (companyName: string) => {
  return prisma.company.findFirst({
    where: { name: companyName },
    select: companySelect,
  });
};

export const getCompanies = async () => {
  return prisma.company.findMany();
};

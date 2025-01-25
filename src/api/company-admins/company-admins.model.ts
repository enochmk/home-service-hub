import prisma from '../../db/prisma.db';
import { userCompanySelect } from './company-admins.interface';

export const addCompanyAdmin = async (companyId: string, userId: string) => {
  return prisma.userCompany.create({
    data: {
      companyId,
      userId: userId,
    },
    select: userCompanySelect,
  });
};

export const removeAdminFromCompany = async (companyId: string, userId: string) => {
  return prisma.userCompany.deleteMany({
    where: {
      companyId,
      userId,
    },
  });
};

export const findCompanyAdmins = async (companyId: string) => {
  return prisma.userCompany.findMany({
    where: {
      companyId,
    },
    select: { ...userCompanySelect, company: false },
  });
};

export const findCompanyAdminByCompanyIdAndUserId = async (companyId: string, userId: string) => {
  return prisma.userCompany.findUnique({
    where: {
      userId_companyId: {
        companyId,
        userId,
      },
    },
    select: { ...userCompanySelect, company: false },
  });
};

export const findCompanyAdminByUserId = async (userId: string) => {
  return prisma.userCompany.findFirst({
    where: {
      userId,
    },
    select: { ...userCompanySelect, company: true },
  });
};

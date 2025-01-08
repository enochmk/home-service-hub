import prisma from '../../db/prisma.db';
import { companyAdminSelect } from './company-admins.interface';

export const addCompanyAdmin = async (companyId: string, userId: string) => {
  return prisma.companyAdmins.create({
    data: {
      companyId,
      userId: userId,
    },
    select: companyAdminSelect,
  });
};

export const removeAdminFromCompany = async (companyId: string, userId: string) => {
  return prisma.companyAdmins.deleteMany({
    where: {
      companyId,
      userId,
    },
  });
};

export const findCompanyAdmins = async (companyId: string) => {
  return prisma.companyAdmins.findMany({
    where: {
      companyId,
    },
    select: { ...companyAdminSelect, company: false },
  });
};

export const findCompanyAdminByCompanyIdAndUserId = async (companyId: string, userId: string) => {
  return prisma.companyAdmins.findUnique({
    where: {
      userId_companyId: {
        companyId,
        userId,
      },
    },
    select: { ...companyAdminSelect, company: false },
  });
};

export const findCompanyAdminByUserId = async (userId: string) => {
  return prisma.companyAdmins.findFirst({
    where: {
      userId,
    },
    select: { ...companyAdminSelect, company: true },
  });
};

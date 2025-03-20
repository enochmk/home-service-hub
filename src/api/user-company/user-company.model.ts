import prisma from '../../db/prisma.db';
import { userCompanySelect } from './user-company.interface';

export const addUserToCompany = async (companyId: number, userId: number) => {
  return prisma.userCompany.create({
    data: {
      companyId,
      userId: userId,
    },
    select: userCompanySelect,
  });
};

export const removeUserFromCompany = async (
  companyId: number,
  userId: number,
) => {
  return prisma.userCompany.deleteMany({
    where: {
      companyId,
      userId,
    },
  });
};

export const findCompanyUsers = async (companyId: number) => {
  return prisma.userCompany.findMany({
    where: {
      companyId,
    },
    select: { ...userCompanySelect, company: false },
  });
};

export const findCompanyUserByCompanyIdAndUserId = async (
  companyId: number,
  userId: number,
) => {
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

export const findCompanyUserByUserId = async (userId: number) => {
  return prisma.userCompany.findFirst({
    where: {
      userId,
    },
    select: { ...userCompanySelect, company: true },
  });
};

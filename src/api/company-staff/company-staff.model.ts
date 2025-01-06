import prisma from '../../db/prisma.db';

export const findCompanyStaff = async (companyId: string, userId: string) => {
  return prisma.companyStaff.findUnique({
    where: {
      companyId_userId: {
        companyId,
        userId,
      },
    },
  });
};

export const addCompanyStaff = async (companyId: string, userId: string) => {
  return prisma.companyStaff.create({
    data: {
      companyId,
      userId,
    },
  });
};

export const removeCompanyStaff = async (companyId: string, userId: string) => {
  return prisma.companyStaff.delete({
    where: {
      companyId_userId: {
        companyId,
        userId,
      },
    },
  });
};

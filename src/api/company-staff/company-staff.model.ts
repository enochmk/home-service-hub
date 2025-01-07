import prisma from '../../db/prisma.db';

export const findCompanyStaffByCompanyId = async (companyId: string) => {
  return prisma.companyStaff.findFirst({
    where: {
      companyId,
    },
    include: {
      user: true,
    },
  });
};

export const findCompanyStaffByUserId = async (companyId: string, userId: string) => {
  return prisma.companyStaff.findUnique({
    where: {
      userId_companyId: {
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
      userId_companyId: {
        companyId,
        userId,
      },
    },
  });
};

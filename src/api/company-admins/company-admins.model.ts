import prisma from '../../db/prisma.db';

export const createCompanyAdmin = async (companyId: string, userId: string) => {
  return prisma.companyAdmins.create({
    data: {
      companyId,
      userId,
    },
  });
};

export const deleteCompanyAdmin = async (companyId: string, userId: string) => {
  return prisma.companyAdmins.deleteMany({
    where: {
      companyId,
      userId,
    },
  });
};

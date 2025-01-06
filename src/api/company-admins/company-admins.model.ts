import prisma from '../../db/prisma.db';

export const createCompanyAdmin = async (companyId: string, userId: string) => {
  return prisma.companyAdmins.create({
    data: {
      companyId,
      userId,
    },
    select: {
      company: true,
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
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

export const findCompanyAdmins = async (companyId: string) => {
  return prisma.companyAdmins.findMany({
    where: {
      companyId,
    },
    select: {
      company: true,
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
};

export const findCompanyAdminProfile = async (companyId: string, userId: string) => {
  return prisma.companyAdmins.findUnique({
    where: {
      userId_companyId: {
        companyId,
        userId,
      },
    },
    select: {
      company: true,
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
};

import prisma from '../../db/prisma.db';
import { ROLES } from '../../utils/constants';
import { AddCompanyStaffInput } from './company-staff.schema';

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

export const createUserAsCompanyStaff = async (user: AddCompanyStaffInput) => {
  const createdUser = await prisma.users.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      role: {
        connect: {
          name: ROLES.COMPANY_STAFF,
        },
      },
    },
  });

  return createdUser;
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

export const getCompanyStaffByCompanyId = async (companyId: string) => {
  return prisma.companyStaff.findMany({
    where: {
      companyId,
    },
    include: {
      user: true,
    },
  });
};

export const getCompanyStaffByUserId = async (companyId: string, userId: string) => {
  return prisma.companyStaff.findUnique({
    where: {
      userId_companyId: {
        companyId,
        userId,
      },
    },
    include: {
      user: true,
    },
  });
};

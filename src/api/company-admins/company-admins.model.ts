import prisma from '../../db/prisma.db';
import { AddCompanyAdminInput } from './company-admins.schema';
import { ROLES } from '../../utils/constants';
import { companyAdminSelect } from './company-admins.interface';

export const createUserAsCompanyAdmin = async (user: AddCompanyAdminInput) => {
  const createdUser = await prisma.users.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      role: {
        connect: {
          name: ROLES.COMPANY_ADMIN,
        },
      },
    },
  });

  return createdUser;
};

export const createCompanyAdmin = async (companyId: string, userId: string) => {
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
    select: companyAdminSelect,
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
    select: companyAdminSelect,
  });
};

export const deleteCompanyAdmin = async (companyId: string, userId: string) => {
  await removeAdminFromCompany(companyId, userId);
  return prisma.users.delete({
    where: {
      id: userId,
    },
  });
};

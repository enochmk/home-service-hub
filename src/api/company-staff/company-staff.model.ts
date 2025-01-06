import prisma from '../../db/prisma.db';
import { ROLES } from '../../utils/constants';
import { UpdateCompanyInput } from '../companies/companies.schema';
import { CreateCompanyStaffInput, UpdateCompanyStaffInput } from './company-staff.schema';

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

export const createUserAsCompanyStaff = async (data: CreateCompanyStaffInput) => {
  const createdUser = await prisma.users.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
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

export const getCompanyStaffByEmail = async (companyId: string, email: string) => {
  return prisma.companyStaff.findFirst({
    where: {
      companyId,
      user: {
        email,
      },
    },
    include: {
      user: true,
    },
  });
};

export const addUserToCompany = async (companyId: string, userId: string) => {
  return prisma.companyStaff.create({
    data: {
      companyId,
      userId,
    },
  });
};

export const updateCompanyStaff = async (
  companyId: string,
  userId: string,
  data: UpdateCompanyStaffInput,
) => {
  //
  const updatedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  );

  return prisma.companyStaff.update({
    where: {
      userId_companyId: {
        companyId,
        userId,
      },
    },
    data: updatedData,
  });
};

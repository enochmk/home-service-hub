import { Prisma } from '@prisma/client';

export const companyAdminSelect: Prisma.companyAdminsSelect = {
  company: true,
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      role: false,
      createdAt: true,
      updatedAt: true,
    },
  },
};

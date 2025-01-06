import { Prisma } from '@prisma/client';

export const companyAdminSelect: Prisma.companyAdminsSelect = {
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
};

import { Prisma } from '@prisma/client';

export const companySelect: Prisma.companySelect = {
  id: true,
  name: true,
  createdAt: true,
};

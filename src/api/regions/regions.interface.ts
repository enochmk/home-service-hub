import { Prisma } from '@prisma/client';

export const regionSelect: Prisma.regionsSelect = {
  id: true,
  name: true,
  createdAt: true,
};

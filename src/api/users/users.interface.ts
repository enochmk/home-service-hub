import { Prisma } from '@prisma/client';

export const usersInclude: Prisma.usersSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  active: true,
  roleId: true,
  password: false,
  phoneNumber: true,
  shouldUpdatePassword: true,
  role: true,
  userCompany: true,
  createdAt: true,
  updatedAt: true,
};

export type UserQueryOptions = {
  filters?: Prisma.usersWhereInput;
  orderBy?: Prisma.usersOrderByWithRelationInput;
  limit?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
};

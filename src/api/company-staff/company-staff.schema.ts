import { RequestHandler } from 'express';
import z from 'zod';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../utils/constants';

export const createCompanyStaffSchema = z.object({
  params: z.object({
    companyId: z.string().uuid(),
  }),
  body: z.object({
    firstName: z.string().min(2, 'First name is too short').max(100, 'First name is too long'),
    lastName: z.string().min(2, 'Last name is too short').max(100, 'Last name is too long'),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Password is too short')
      .max(MAX_PASSWORD_LENGTH, 'Password is too long'),
    roleId: z.string().uuid().optional(),
  }),
});
export type CreateCompanyStaffInput = z.infer<typeof createCompanyStaffSchema>['body'];

export type CreateCompanyStaffRequest = RequestHandler<
  z.infer<typeof createCompanyStaffSchema>['params'],
  any,
  z.infer<typeof createCompanyStaffSchema>['body']
>;

export const deleteCompanyStaffSchema = z.object({
  params: z.object({
    companyId: z.string().uuid(),
    userId: z.string().uuid(),
  }),
});

export type DeleteCompanyStaffInput = z.infer<typeof deleteCompanyStaffSchema>['params'];

export type DeleteCompanyStaffRequest = RequestHandler<DeleteCompanyStaffInput, any, any>;

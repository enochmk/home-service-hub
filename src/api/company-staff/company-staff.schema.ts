import { RequestHandler } from 'express';
import z from 'zod';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../utils/constants';

export const addCompanyStaffSchema = z.object({
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
  params: z.object({
    companyId: z.string().uuid(),
  }),
});
export type AddCompanyStaffInput = z.infer<typeof addCompanyStaffSchema>['body'];

export type AddCompanyStaffRequest = RequestHandler<
  z.infer<typeof addCompanyStaffSchema>['params'],
  any,
  z.infer<typeof addCompanyStaffSchema>['body']
>;

export const removeCompanyStaffSchema = z.object({
  params: z.object({
    companyId: z.string().uuid(),
    userId: z.string().uuid(),
  }),
});

export type RemoveCompanyStaffInput = z.infer<typeof removeCompanyStaffSchema>['params'];

export type RemoveCompanyStaffRequest = RequestHandler<RemoveCompanyStaffInput, any, any>;

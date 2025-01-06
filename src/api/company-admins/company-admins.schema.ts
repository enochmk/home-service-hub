import { RequestHandler } from 'express';
import z from 'zod';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../utils/constants';

export const addCompanyAdminSchema = z.object({
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

export type AddCompanyAdminInput = z.infer<typeof addCompanyAdminSchema>['body'];
export type AddCompanyAdminParams = z.infer<typeof addCompanyAdminSchema>['params'];

export type AddCompanyAdminRequest = RequestHandler<
  AddCompanyAdminParams,
  any,
  AddCompanyAdminInput
>;

export const removeCompanyAdminSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
    companyId: z.string().uuid(),
  }),
});

export type RemoveCompanyAdminParams = z.infer<typeof removeCompanyAdminSchema>['params'];

export type RemoveCompanyAdminRequest = RequestHandler<RemoveCompanyAdminParams, any, any>;

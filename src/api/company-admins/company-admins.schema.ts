import { RequestHandler } from 'express';
import z from 'zod';

export const addCompanyAdminSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
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
  body: z.object({
    userId: z.string().uuid(),
  }),
  params: z.object({
    companyId: z.string().uuid(),
  }),
});

export type RemoveCompanyAdminInput = z.infer<typeof removeCompanyAdminSchema>['body'];
export type RemoveCompanyAdminParams = z.infer<typeof removeCompanyAdminSchema>['params'];

export type RemoveCompanyAdminRequest = RequestHandler<
  RemoveCompanyAdminParams,
  any,
  RemoveCompanyAdminInput
>;

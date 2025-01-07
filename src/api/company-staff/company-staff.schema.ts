import { RequestHandler } from 'express';
import z from 'zod';

export const addCompanyStaffSchema = z.object({
  params: z.object({
    companyId: z.string().uuid(),
  }),
  body: z.object({
    userId: z.string().uuid(),
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

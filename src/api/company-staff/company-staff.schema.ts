import { RequestHandler } from 'express';
import z from 'zod';

export const addCompanyStaffSchema = z.object({
  body: z.object({
    companyId: z.string().uuid(),
    userId: z.string().uuid(),
  }),
});

export type AddCompanyStaffInput = z.infer<typeof addCompanyStaffSchema>['body'];

export type AddCompanyStaffRequest = RequestHandler<any, any, AddCompanyStaffInput>;

export const removeCompanyStaffSchema = z.object({
  body: z.object({
    companyId: z.string().uuid(),
    userId: z.string().uuid(),
  }),
});

export type RemoveCompanyStaffInput = z.infer<typeof removeCompanyStaffSchema>['body'];

export type RemoveCompanyStaffRequest = RequestHandler<any, any, RemoveCompanyStaffInput>;

import { RequestHandler } from 'express';
import { z } from 'zod';

export const createCompanySchema = z.object({
  body: z.object({
    name: z.string().min(3).max(120),
  }),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>['body'];

export type CreateCompanyRequest = RequestHandler<any, any, CreateCompanyInput>;

export const updateCompanySchema = z.object({
  params: z.object({
    companyId: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(3).max(120),
  }),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>['body'];

export type UpdateCompanyRequest = RequestHandler<
  z.infer<typeof updateCompanySchema>['params'],
  any,
  z.infer<typeof updateCompanySchema>['body']
>;

export const getCompanySchema = z.object({
  params: z.object({
    companyId: z.string().uuid(),
  }),
});

export type GetCompanyRequest = RequestHandler<
  z.infer<typeof updateCompanySchema>['params'],
  any,
  any
>;

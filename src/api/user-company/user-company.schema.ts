import { RequestHandler } from 'express';
import z from 'zod';

export const addCompanyUserSchema = z.object({
  params: z.object({
    companyId: z.string(),
  }),
  body: z.object({
    userId: z.number(),
  }),
});

export type AddCompanyUserInput = z.infer<typeof addCompanyUserSchema>['body'];
export type AddCompanyUserParams = z.infer<typeof addCompanyUserSchema>['params'];

export type AddCompanyUserRequest = RequestHandler<AddCompanyUserParams, any, AddCompanyUserInput>;

export const removeCompanyUserSchema = z.object({
  params: z.object({
    userId: z.string(),
    companyId: z.string(),
  }),
});

export type RemoveCompanyUserParams = z.infer<typeof removeCompanyUserSchema>['params'];

export type RemoveCompanyUserRequest = RequestHandler<RemoveCompanyUserParams, any, any>;

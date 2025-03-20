import { z } from 'zod';

export const getRequestSchema = z.object({
  params: z.object({
    requestId: z.string(),
  }),
});

export type GetRequestInput = z.infer<typeof getRequestSchema>['params'];

export const createRequestSchema = z.object({
  body: z.object({
    statusId: z.number().int().positive(),
    locationId: z.number().int().positive(),
    companyId: z.number().int().positive().optional(),
  }),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>['body'];

export const updateRequestSchema = z.object({
  body: z.object({
    statusId: z.number().int().positive().optional(),
    locationId: z.number().int().positive().optional(),
    companyId: z.number().int().positive().optional(),
  }),
});

export type UpdateRequestInput = z.infer<typeof updateRequestSchema>['body'];

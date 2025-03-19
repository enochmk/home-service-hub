import { z } from 'zod';

export const createRequestSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>['body'];

export const updateRequestSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export type UpdateRequestInput = z.infer<typeof updateRequestSchema>['body'];

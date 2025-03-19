import { z } from 'zod';

export const createStatusSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export type CreateStatusInput = z.infer<typeof createStatusSchema>['body'];

export const updateStatusSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>['body'];

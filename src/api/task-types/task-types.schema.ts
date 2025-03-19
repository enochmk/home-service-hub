import { z } from 'zod';

export const createTaskTypeSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export type CreateTaskTypeInput = z.infer<typeof createTaskTypeSchema>['body'];

export const updateTaskTypeSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export type UpdateTaskTypeInput = z.infer<typeof updateTaskTypeSchema>['body'];

import { z } from 'zod';

export const getTaskTypeSchema = z.object({
  params: z.object({
    taskTypeId: z.string(),
  }),
});

export type GetTaskTypeInput = z.infer<typeof getTaskTypeSchema>['params'];

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

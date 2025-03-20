import { z } from 'zod';

export const getTaskSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
});

export type GetTaskInput = z.infer<typeof getTaskSchema>['params'];

export const createTaskSchema = z.object({
  body: z.object({
    taskTypeId: z.number().int().positive(),
    requestId: z.number().int().positive(),
    taskDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    workerId: z.number().int().positive().optional(),
  }),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>['body'];

export const updateTaskSchema = z.object({
  body: z.object({
    taskTypeId: z.number().int().positive().optional(),
    requestId: z.number().int().positive().optional(),
    taskDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    workerId: z.number().int().positive().optional(),
  }),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>['body'];

import { z } from 'zod';

export const createLocationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export type CreateLocationInput = z.infer<typeof createLocationSchema>['body'];

export const updateLocationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export type UpdateLocationInput = z.infer<typeof updateLocationSchema>['body'];

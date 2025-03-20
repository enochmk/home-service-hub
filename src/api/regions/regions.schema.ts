import { z } from 'zod';

export const getRegionSchema = z.object({
  params: z.object({
    regionId: z.string(),
  }),
});

export type GetRegionInput = z.infer<typeof getRegionSchema>['params'];

export const createRegionSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export type CreateRegionInput = z.infer<typeof createRegionSchema>['body'];

export const updateRegionSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export type UpdateRegionInput = z.infer<typeof updateRegionSchema>['body'];

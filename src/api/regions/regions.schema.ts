import { z } from 'zod';

export const createRegionSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export type CreateRegionInput = z.infer<typeof createRegionSchema>['body'];

import { z } from 'zod';

export const createLocationSchema = z.object({
  body: z.object({
    regionId: z.number().int().positive(),
    city: z.string().min(3).max(120),
    address: z.string().min(3).max(120),
    googleMap: z.string().min(3).max(120),
    ghanaGPS: z.string().min(3).max(120),
  }),
});

export type CreateLocationInput = z.infer<typeof createLocationSchema>['body'];

export const updateLocationSchema = z.object({
  body: z.object({
    regionId: z.number().int().positive().optional(),
    city: z.string().min(3).max(120).optional(),
    address: z.string().min(3).max(120).optional(),
    googleMap: z.string().min(3).max(120).optional(),
    ghanaGPS: z.string().min(3).max(120).optional(),
  }),
});

export type UpdateLocationInput = z.infer<typeof updateLocationSchema>['body'];

import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(3).max(120),
});

export const updateCompanySchema = z.object({
  name: z.string().min(3).max(120),
});

export type CreateCompanyRequest = z.infer<typeof createCompanySchema>;
export type UpdateCompanyRequest = z.infer<typeof updateCompanySchema>;

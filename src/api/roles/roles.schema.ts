import { z } from 'zod';
import { RequestHandler } from 'express';

export const rolePermissionSchema = z.object({
  params: z.object({
    roleId: z.string().uuid(),
  }),
  body: z.object({
    permissionId: z.string().uuid(),
  }),
});

export type RolePermissionParams = z.infer<typeof rolePermissionSchema>['params'];
export type RolePermissionBody = z.infer<typeof rolePermissionSchema>['body'];

export type RolePermissionRequest = RequestHandler<RolePermissionParams, any, RolePermissionBody>;

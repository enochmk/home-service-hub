import { z } from 'zod';
import { ROLES, PERMISSIONS } from '../../utils/constants';
import { RequestHandler } from 'express';

export const rolePermissionSchema = z.object({
  params: z.object({
    roleId: z.string().refine((roleId) => ROLES[roleId], {
      message: 'Invalid role',
    }),
  }),
  body: z.object({
    permissionId: z.string().refine((permissionId) => PERMISSIONS[permissionId], {
      message: 'Invalid permission',
    }),
  }),
});

export type RolePermissionParams = z.infer<typeof rolePermissionSchema>['params'];
export type RolePermissionBody = z.infer<typeof rolePermissionSchema>['body'];

export type RolePermissionRequest = RequestHandler<RolePermissionParams, any, RolePermissionBody>;

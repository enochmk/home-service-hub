import { Router } from 'express';
import * as controller from './roles.controller';
import { checkPermission } from '../permissions/permissions.middleware';
import { PERMISSIONS } from '../../utils/constants';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { rolePermissionSchema } from './roles.schema';

const router = Router();

router.post(
  '/:roleId/permissions',
  schemaValidation(rolePermissionSchema),
  checkPermission([PERMISSIONS['roles.addPermission']]),
  controller.addPermissionToRole,
);

router.delete(
  '/:roleId/permissions',
  schemaValidation(rolePermissionSchema),
  checkPermission([PERMISSIONS['roles.removePermission']]),
  controller.removePermissionFromRole,
);

export default router;

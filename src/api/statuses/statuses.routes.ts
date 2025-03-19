import { Router } from 'express';
import * as controller from './statuses.controller';
import * as permissions from '../permissions/permissions.middleware';
import * as middlewares from './statuses.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import * as schema from './statuses.schema';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

router.get(
  '/',
  permissions.checkPermission([PERMISSIONS['status.list']]),
  controller.getAllStatuses,
);

router.get(
  '/:statusId',
  permissions.checkPermission([PERMISSIONS['status.view']]),
  middlewares.checkStatusIdExist,
  controller.getStatusById,
);

router.post(
  '/',
  schemaValidation(schema.createStatusSchema),
  permissions.checkPermission([PERMISSIONS['status.create']]),
  middlewares.checkStatusNameAvailable,
  controller.createStatus,
);

router.put(
  '/:statusId',
  schemaValidation(schema.updateStatusSchema),
  permissions.checkPermission([PERMISSIONS['status.update']]),
  middlewares.checkStatusIdExist,
  middlewares.checkStatusNameAvailable,
  controller.updateStatus,
);

router.delete(
  '/:statusId',
  permissions.checkPermission([PERMISSIONS['status.delete']]),
  middlewares.checkStatusIdExist,
  controller.deleteStatus,
);

export default router;

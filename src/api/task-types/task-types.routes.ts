import { Router } from 'express';
import * as controller from './task-types.controller';
import * as permissions from '../permissions/permissions.middleware';
import * as middlewares from './task-types.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import * as schema from './task-types.schema';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

router.get(
  '/',
  permissions.checkPermission([PERMISSIONS['taskTypes.list']]),
  controller.getAllTaskTypes,
);

router.get(
  '/:taskTypeId',
  schemaValidation(schema.getTaskTypeSchema),
  permissions.checkPermission([PERMISSIONS['taskTypes.view']]),
  middlewares.checkTaskTypeIdExist,
  controller.getTaskTypeById,
);

router.post(
  '/',
  schemaValidation(schema.createTaskTypeSchema),
  permissions.checkPermission([PERMISSIONS['taskTypes.create']]),
  middlewares.checkTaskTypeNameAvailable,
  controller.createTaskType,
);

router.put(
  '/:taskTypeId',
  schemaValidation(schema.updateTaskTypeSchema),
  permissions.checkPermission([PERMISSIONS['taskTypes.update']]),
  middlewares.checkTaskTypeIdExist,
  middlewares.checkTaskTypeNameAvailable,
  controller.updateTaskType,
);

router.delete(
  '/:taskTypeId',
  schemaValidation(schema.getTaskTypeSchema),
  permissions.checkPermission([PERMISSIONS['taskTypes.delete']]),
  middlewares.checkTaskTypeIdExist,
  controller.deleteTaskType,
);

export default router;

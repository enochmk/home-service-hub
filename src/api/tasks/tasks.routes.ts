import { Router } from 'express';
import * as controller from './tasks.controller';
import * as permissions from '../permissions/permissions.middleware';
import * as middlewares from './tasks.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import * as schema from './tasks.schema';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

router.get(
  '/',
  permissions.checkPermission([PERMISSIONS['task.list']]),
  controller.getAllTasks,
);

router.get(
  '/:taskId',
  schemaValidation(schema.getTaskSchema),
  permissions.checkPermission([PERMISSIONS['task.view']]),
  middlewares.checkTaskIdExist,
  controller.getTaskById,
);

router.post(
  '/',
  schemaValidation(schema.createTaskSchema),
  permissions.checkPermission([PERMISSIONS['task.create']]),
  middlewares.validateTaskCreation,
  controller.createTask,
);

router.put(
  '/:taskId',
  schemaValidation(schema.updateTaskSchema),
  permissions.checkPermission([PERMISSIONS['task.update']]),
  middlewares.checkTaskIdExist,
  controller.updateTask,
);

router.delete(
  '/:taskId',
  schemaValidation(schema.getTaskSchema),
  permissions.checkPermission([PERMISSIONS['task.delete']]),
  middlewares.checkTaskIdExist,
  controller.deleteTask,
);

export default router;

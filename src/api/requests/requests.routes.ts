import { Router } from 'express';
import * as controller from './requests.controller';
import * as permissions from '../permissions/permissions.middleware';
import * as middlewares from './requests.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import * as schema from './requests.schema';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

router.get(
  '/',
  permissions.checkPermission([PERMISSIONS['request.list']]),
  controller.getAllRequests,
);

router.get(
  '/:requestId',
  schemaValidation(schema.getRequestSchema),
  permissions.checkPermission([PERMISSIONS['request.view']]),
  middlewares.checkRequestIdExist,
  controller.getRequestById,
);

router.post(
  '/',
  schemaValidation(schema.createRequestSchema),
  permissions.checkPermission([PERMISSIONS['request.create']]),
  middlewares.validateRequestCreation,
  controller.createRequest,
);

router.put(
  '/:requestId',
  schemaValidation(schema.updateRequestSchema),
  permissions.checkPermission([PERMISSIONS['request.update']]),
  middlewares.checkRequestIdExist,
  middlewares.validateRequestCreation,
  controller.updateRequest,
);

router.delete(
  '/:requestId',
  schemaValidation(schema.getRequestSchema),
  permissions.checkPermission([PERMISSIONS['request.delete']]),
  middlewares.checkRequestIdExist,
  controller.deleteRequest,
);

export default router;

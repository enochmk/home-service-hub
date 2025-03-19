import { Router } from 'express';
import * as controller from './regions.controller';
import * as permissions from '../permissions/permissions.middleware';
import * as middlewares from './regions.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import * as schema from './regions.schema';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

router.get(
  '/',
  permissions.checkPermission([PERMISSIONS['regions.list']]),
  controller.getAllRegions,
);

router.get(
  '/:regionId',
  permissions.checkPermission([PERMISSIONS['regions.view']]),
  middlewares.checkRegionIdExist,
  controller.getRegionById,
);

router.post(
  '/',
  schemaValidation(schema.createRegionSchema),
  permissions.checkPermission([PERMISSIONS['regions.create']]),
  middlewares.checkRegionNameAvailable,
  controller.createRegion,
);

router.put(
  '/:regionId',
  schemaValidation(schema.updateRegionSchema),
  permissions.checkPermission([PERMISSIONS['regions.update']]),
  middlewares.checkRegionIdExist,
  middlewares.checkRegionNameAvailable,
  controller.updateRegion,
);

router.delete(
  '/:regionId',
  permissions.checkPermission([PERMISSIONS['regions.delete']]),
  middlewares.checkRegionIdExist,
  controller.deleteRegion,
);

export default router;

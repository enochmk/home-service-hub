import { Router } from 'express';
import * as controller from './locations.controller';
import * as permissions from '../permissions/permissions.middleware';
import * as middlewares from './locations.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import * as schema from './locations.schema';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

router.get(
  '/',
  permissions.checkPermission([PERMISSIONS['locations.list']]),
  controller.getAllLocations,
);

router.get(
  '/:locationId',
  schemaValidation(schema.getLocationSchema),
  permissions.checkPermission([PERMISSIONS['locations.view']]),
  middlewares.checkLocationIdExist,
  controller.getLocationById,
);

router.post(
  '/',
  schemaValidation(schema.createLocationSchema),
  permissions.checkPermission([PERMISSIONS['locations.create']]),
  middlewares.checkRegionIdExist,
  controller.createLocation,
);

router.put(
  '/:locationId',
  schemaValidation(schema.updateLocationSchema),
  permissions.checkPermission([PERMISSIONS['locations.update']]),
  middlewares.checkLocationIdExist,
  middlewares.checkRegionIdExist,
  controller.updateLocation,
);

router.delete(
  '/:locationId',
  schemaValidation(schema.getLocationSchema),
  permissions.checkPermission([PERMISSIONS['locations.delete']]),
  middlewares.checkLocationIdExist,
  controller.deleteLocation,
);

export default router;

import { Router } from 'express';
import * as controller from './regions.controller';
import { checkPermission } from '../permissions/permissions.middleware';
import { PERMISSIONS } from '../../utils/constants';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { createRegionSchema } from './regions.schema';

const router = Router();

router.get('/', checkPermission([PERMISSIONS['regions.list']]), controller.getAllRegions);

router.get('/:regionId', checkPermission([PERMISSIONS['regions.view']]), controller.getRegionById);

router.post(
  '/',
  checkPermission([PERMISSIONS['regions.create']]),
  schemaValidation(createRegionSchema),
  controller.createRegion,
);

router.put(
  '/:regionId',
  checkPermission([PERMISSIONS['regions.update']]),
  schemaValidation(createRegionSchema),
  controller.updateRegion,
);

router.delete(
  '/:regionId',
  checkPermission([PERMISSIONS['regions.delete']]),
  controller.deleteRegion,
);

export default router;

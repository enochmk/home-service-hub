import { RequestHandler } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';

const logger = getLogger('LocationController');

export const getAllLocations: RequestHandler = async (req, res) => {
  logger.verbose('Getting all locations');
  const data = await prisma.locations.findMany();
  logger.info('Locations retrieved successfully', { data });
  res.status(200).json({ data });
};

export const getLocationById: RequestHandler = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  logger.verbose('Getting location by id', { locationId });
  const data = await prisma.locations.findUnique({ where: { id: locationId } });
  logger.info('Location retrieved successfully', { data });
  res.status(200).json(data);
};

export const createLocation: RequestHandler = async (req, res) => {
  const userId = res.locals.user!.id;
  const data = { ...req.body, createdById: userId };
  logger.verbose('Creating location', { data });
  const newLocation = await prisma.locations.create({ data });
  logger.info('Location created successfully', { newLocation });
  res.status(201).json(newLocation);
};

export const updateLocation: RequestHandler = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  logger.verbose('Updating location', { locationId });
  const data = await prisma.locations.update({
    where: { id: locationId },
    data: req.body,
  });
  logger.info('Location updated successfully', { data });
  res.status(200).json(data);
};

export const deleteLocation: RequestHandler = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  logger.verbose('Deleting location', { locationId });
  await prisma.locations.delete({ where: { id: locationId } });
  logger.info('Location deleted successfully', { locationId });
  res.sendStatus(204);
};

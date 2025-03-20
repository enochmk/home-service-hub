import { RequestHandler } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';
import { CreateLocationInput, UpdateLocationInput } from './locations.schema';

const logger = getLogger('LocationController');

export const getAllLocations: RequestHandler = async (req, res) => {
  logger.verbose('Getting all locations');
  const data = await prisma.locations.findMany();
  logger.info('Locations retrieved successfully', { data });
  res.status(200).json({ data });
};

type GetRequest = RequestHandler<{ locationId: string }>;
export const getLocationById: GetRequest = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  logger.verbose('Getting location by id', { locationId });
  const data = await prisma.locations.findUnique({ where: { id: locationId } });
  logger.info('Location retrieved successfully', { data });
  res.status(200).json(data);
};

type CreateRequest = RequestHandler<unknown, unknown, CreateLocationInput>;
export const createLocation: CreateRequest = async (req, res) => {
  const userId = res.locals.user!.id;
  const data = { ...req.body, createdById: userId };
  logger.verbose('Creating location', { data });
  const newLocation = await prisma.locations.create({ data });
  logger.info('Location created successfully', { newLocation });
  res.status(201).json(newLocation);
};

type UpdateRequest = RequestHandler<
  { locationId: string },
  unknown,
  UpdateLocationInput
>;
export const updateLocation: UpdateRequest = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  logger.verbose('Updating location', { locationId });
  const data = await prisma.locations.update({
    where: { id: locationId },
    data: req.body,
  });
  logger.info('Location updated successfully', { data });
  res.status(200).json(data);
};

type DeleteRequest = RequestHandler<{ locationId: string }>;
export const deleteLocation: DeleteRequest = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  logger.verbose('Deleting location', { locationId });
  await prisma.locations.delete({ where: { id: locationId } });
  logger.info('Location deleted successfully', { locationId });
  res.sendStatus(204);
};

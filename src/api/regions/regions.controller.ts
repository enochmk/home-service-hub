import { RequestHandler } from 'express';
import prisma from '../../db/prisma.db';
import { regionSelect } from './regions.interface';
import { getLogger } from '../../utils/logger';
import { CreateRegionInput, UpdateRegionInput } from './regions.schema';

const logger = getLogger('RegionsController');

export const getAllRegions: RequestHandler = async (req, res) => {
  logger.verbose('Getting all regions');
  const data = await prisma.regions.findMany({
    select: regionSelect,
  });
  logger.info('Regions retrieved', { regions: data });
  res.status(200).json({ data });
};

type GetRegion = RequestHandler<{ regionId: string }>;
export const getRegionById: GetRegion = async (req, res) => {
  const regionId = parseInt(req.params.regionId);
  logger.verbose(`Getting region with id ${regionId}`);
  const region = await prisma.regions.findUnique({
    where: { id: regionId },
    select: regionSelect,
  });
  logger.info('Region retrieved', { regionId, region });
  res.status(200).json(region);
};

type CreateRegion = RequestHandler<unknown, unknown, CreateRegionInput>;
export const createRegion: CreateRegion = async (req, res) => {
  const { name } = req.body;
  logger.verbose('Creating a new region', { name });
  const region = await prisma.regions.create({
    data: {
      name,
    },
    select: regionSelect,
  });
  logger.info('Region created', { region });
  res.status(201).json(region);
};

type UpdateRegion = RequestHandler<{ regionId: string }, any, UpdateRegionInput>;
export const updateRegion: UpdateRegion = async (req, res) => {
  const regionId = parseInt(req.params.regionId);
  logger.verbose(`Updating region with id ${regionId}`, req.body);
  const region = await prisma.regions.update({
    where: { id: regionId },
    data: req.body,
    select: regionSelect,
  });
  logger.info('Region updated', { regionId, region });
  res.status(200).json(region);
};

type DeleteRegion = RequestHandler<{ regionId: string }>;
export const deleteRegion: DeleteRegion = async (req, res) => {
  const regionId = parseInt(req.params.regionId);
  logger.verbose(`Deleting region with id ${regionId}`);
  await prisma.regions.delete({
    where: { id: regionId },
  });
  logger.info('Region deleted', { regionId });
  res.sendStatus(204);
};

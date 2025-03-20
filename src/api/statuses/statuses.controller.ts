import { RequestHandler } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';
import { CreateStatusInput, UpdateStatusInput } from './statuses.schema';

const logger = getLogger('StatusesController');

export const getAllStatuses: RequestHandler = async (req, res) => {
  logger.verbose('Fetching all statuses');
  const data = await prisma.statuses.findMany();
  logger.info('Fetched all statuses', data);
  res.status(200).json({ data: data });
};

type GetStatus = RequestHandler<{ statusId: string }>;
export const getStatusById: GetStatus = async (req, res) => {
  const statusId = parseInt(req.params.statusId);
  logger.verbose('Fetching status by ID', { statusId });
  const data = await prisma.statuses.findUnique({ where: { id: statusId } });
  logger.info('Fetched status by ID', data);
  res.status(200).json(data);
};

type CreateStatus = RequestHandler<unknown, unknown, CreateStatusInput>;
export const createStatus: CreateStatus = async (req, res) => {
  const { name } = req.body;
  logger.verbose('Creating new status', { name });
  const data = await prisma.statuses.create({ data: { name } });
  logger.info('Created new status', data);
  res.status(201).json(data);
};

type UpdateStatus = RequestHandler<
  { statusId: string },
  any,
  UpdateStatusInput
>;
export const updateStatus: UpdateStatus = async (req, res) => {
  const statusId = parseInt(req.params.statusId);
  const { name } = req.body;
  logger.verbose('Updating status', { statusId, name });
  const data = await prisma.statuses.update({
    where: { id: statusId },
    data: { name },
  });
  logger.info('Updated status', data);
  res.status(200).json(data);
};

type DeleteStatus = RequestHandler<{ statusId: string }>;
export const deleteStatus: DeleteStatus = async (req, res) => {
  const statusId = parseInt(req.params.statusId);
  logger.verbose(`Deleting status with ID: ${statusId}`);
  await prisma.statuses.delete({ where: { id: statusId } });
  logger.info('Deleted status successfully', { statusId });
  res.sendStatus(204);
};

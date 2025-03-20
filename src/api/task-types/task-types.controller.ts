import { RequestHandler } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';

const logger = getLogger('TaskTypes');

export const getAllTaskTypes: RequestHandler = async (req, res) => {
  logger.verbose('Getting all task types');
  const data = await prisma.taskTypes.findMany();
  logger.info('Task types retrieved', data);
  res.status(200).json({ data });
};

export const getTaskTypeById: RequestHandler = async (req, res) => {
  const taskTypeId = parseInt(req.params.taskTypeId);
  logger.verbose('Getting task type by id', { taskTypeId });
  const data = await prisma.taskTypes.findUnique({ where: { id: taskTypeId } });
  logger.info('Task type retrieved', data);
  res.status(200).json(data);
};

export const createTaskType: RequestHandler = async (req, res) => {
  const { name } = req.body;
  logger.verbose('Creating task type', { name });
  const data = await prisma.taskTypes.create({ data: { name } });
  logger.info('Task type created', data);
  res.status(201).json(data);
};

export const updateTaskType: RequestHandler = async (req, res) => {
  const taskTypeId = parseInt(req.params.taskTypeId);
  logger.verbose('Updating task type', { taskTypeId, ...req.body });
  const { name } = req.body;
  const data = await prisma.taskTypes.update({
    where: { id: taskTypeId },
    data: { name },
  });
  logger.info('Task type updated', data);
  res.status(200).json(data);
};

export const deleteTaskType: RequestHandler = async (req, res) => {
  const taskTypeId = parseInt(req.params.taskTypeId);
  logger.verbose('Deleting task type', { taskTypeId });
  await prisma.taskTypes.delete({ where: { id: taskTypeId } });
  logger.info('Task type deleted', { taskTypeId });
  res.sendStatus(204);
};

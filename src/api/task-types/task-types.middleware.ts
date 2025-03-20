import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';
import { getLogger } from '../../utils/logger';

const logger = getLogger('TaskTypesMiddleware');

export async function checkTaskTypeIdExist(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const taskTypeId = parseInt(req.params.taskTypeId, 10);
  logger.verbose('Checking task type ID exist', { taskTypeId });
  const taskType = await prisma.taskTypes.findMany({
    where: {
      id: taskTypeId,
    },
  });

  // ! If the taskType is empty, throw a 404 error
  if (taskType.length === 0) {
    throw createHttpError.NotFound(`TaskType ID: ${taskTypeId} not found`);
  }

  logger.info('Task type ID exist', { taskTypeId });
  return next();
}

export async function checkTaskTypeNameAvailable(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { name } = req.body;
  logger.verbose('Checking task type name available', { name });
  const taskType = await prisma.taskTypes.findMany({
    where: {
      name,
    },
  });

  if (taskType.length > 0) {
    throw createHttpError.Conflict(`This name: ${name} already exists`);
  }

  logger.info('Task type name available', { name });
  return next();
}

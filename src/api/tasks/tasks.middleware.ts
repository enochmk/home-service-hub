import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';
import { CreateTaskInput } from './tasks.schema';
import { validateRequestIdExist } from '../requests/requests.function';
import { validateTaskTypeIdExist } from '../task-types/task-types.function';
import { validateUserIdExist } from '../users/users.function';

const logger = getLogger('TasksMiddleware');

export async function checkTaskIdExist(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const targetId = parseInt(req.params.taskId, 10);
  logger.verbose('Checking task ID exist', { taskId: targetId });
  const task = await prisma.tasks.findMany({
    where: {
      id: targetId,
    },
  });

  // ! If the task is empty, throw a 404 error
  if (task.length === 0) {
    throw createHttpError.NotFound(`Task ID: ${targetId} not found`);
  }

  logger.info('Task ID exist', { task });
  return next();
}

export async function validateTaskCreation(
  req: Request<any, any, CreateTaskInput>,
  _res: Response,
  next: NextFunction,
) {
  logger.verbose('Validating task creation', req.body);
  const { requestId, taskTypeId, workerId } = req.body;

  logger.verbose('Checking if request ID exist', { requestId });
  await validateRequestIdExist(requestId);
  logger.info('Request ID exist', { requestId });

  logger.verbose('Checking if task type ID exist', { taskTypeId });
  await validateTaskTypeIdExist(taskTypeId);
  logger.info('Task type ID exist', { taskTypeId });

  if (workerId) {
    logger.verbose('Checking if worker ID exists', { workerId });
    await validateUserIdExist(workerId);
    logger.info('Worker ID exists', { workerId });
  }

  return next();
}

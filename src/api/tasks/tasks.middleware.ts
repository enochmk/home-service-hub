import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';

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

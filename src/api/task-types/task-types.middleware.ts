import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function checkTaskTypeIdExist(req: Request, _res: Response, next: NextFunction) {
  const taskTypeId = parseInt(req.params.taskTypeId, 10);
  const taskType = await prisma.taskTypes.findMany({
    where: {
      id: taskTypeId,
    },
  });

  // ! If the taskType is empty, throw a 404 error
  if (taskType.length === 0) {
    throw createHttpError.NotFound('TaskType not found');
  }

  return next();
}

export async function checkTaskTypeNameAvailable(req: Request, _res: Response, next: NextFunction) {
  // const { name } = req.body;
  // const taskType = await prisma.taskTypes.findMany({
  //   where: {
  //     name,
  //   },
  // });

  // if (taskType.length > 0) {
  //   throw createHttpError.Conflict('This name already exists');
  // }

  return next();
}

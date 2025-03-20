import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function validateTaskIdExist(taskId: number) {
  const task = await prisma.tasks.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw createHttpError.NotFound(`Task ID ${taskId} does not exist.`);
  }

  return task;
}

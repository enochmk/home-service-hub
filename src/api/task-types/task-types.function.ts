import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function validateTaskTypeIdExist(taskTypeId: number) {
  const taskType = await prisma.taskTypes.findUnique({
    where: {
      id: taskTypeId,
    },
  });

  if (!taskType) {
    throw createHttpError.NotFound(
      `Task Type ID ${taskTypeId} does not exist.`,
    );
  }

  return taskType;
}

import { RequestHandler } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';
import { CreateTaskInput, UpdateTaskInput } from './tasks.schema';

const logger = getLogger('TasksController');

export const getAllTasks: RequestHandler = async (req, res) => {
  logger.verbose('Fetching all tasks');
  const data = await prisma.tasks.findMany();
  logger.info('Fetched all tasks', data);
  res.status(200).json({ data: data });
};

type GetRequest = RequestHandler<{ taskId: string }>;
export const getTaskById: GetRequest = async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  logger.verbose('Fetching task by ID', { taskId });
  const data = await prisma.tasks.findUnique({ where: { id: taskId } });
  logger.info('Fetched task by ID', data);
  res.status(200).json(data);
};

type CreateRequest = RequestHandler<unknown, unknown, CreateTaskInput>;
export const createTask: CreateRequest = async (req, res) => {
  logger.verbose('Creating new task', req.body);
  const payload = req.body;
  const newTask = await prisma.tasks.create({ data: payload });
  logger.info('Created new task', newTask);
  res.status(201).json(newTask);
};

type UpdateTask = RequestHandler<{ taskId: string }, any, UpdateTaskInput>;
export const updateTask: UpdateTask = async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  logger.verbose('Updating task', { taskId, ...req.body });
  const data = await prisma.tasks.update({
    where: { id: taskId },
    data: req.body,
  });
  logger.info('Updated task', data);
  res.status(200).json(data);
};

type DeleteTask = RequestHandler<{ taskId: string }>;
export const deleteTask: DeleteTask = async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  logger.verbose(`Deleting task with ID: ${taskId}`);
  await prisma.tasks.delete({ where: { id: taskId } });
  logger.info('Deleted task successfully', { taskId });
  res.sendStatus(204);
};

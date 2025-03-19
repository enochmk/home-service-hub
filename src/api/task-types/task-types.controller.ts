import { RequestHandler } from 'express';

export const getAllTaskTypes: RequestHandler = async (req, res) => {
  res.status(200).json({ roles: null });
};

export const getTaskTypeById: RequestHandler = async (req, res) => {
  const taskTypeId = parseInt(req.params.taskTypeId);
  res.status(200).json({ taskTypeId });
};

export const createTaskType: RequestHandler = async (req, res) => {
  const { name } = req.body;
  res.status(201).json({ name });
};

export const updateTaskType: RequestHandler = async (req, res) => {
  const taskTypeId = parseInt(req.params.taskTypeId);
  const { name } = req.body;
  res.status(200).json({ taskTypeId, name });
};

export const deleteTaskType: RequestHandler = async (req, res) => {
  const taskTypeId = parseInt(req.params.taskTypeId);
  res.sendStatus(204);
};

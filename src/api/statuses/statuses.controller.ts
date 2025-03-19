import { RequestHandler } from 'express';

export const getAllStatuses: RequestHandler = async (req, res) => {
  res.status(200).json({ roles: null });
};

export const getStatusById: RequestHandler = async (req, res) => {
  const statusId = parseInt(req.params.statusId);
  res.status(200).json({ statusId });
};

export const createStatus: RequestHandler = async (req, res) => {
  const { name } = req.body;
  res.status(201).json({ name });
};

export const updateStatus: RequestHandler = async (req, res) => {
  const statusId = parseInt(req.params.statusId);
  const { name } = req.body;
  res.status(200).json({ statusId, name });
};

export const deleteStatus: RequestHandler = async (req, res) => {
  // const statusId = parseInt(req.params.statusId);
  res.sendStatus(204);
};

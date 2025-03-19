import { RequestHandler } from 'express';

export const getAllRequests: RequestHandler = async (req, res) => {
  res.status(200).json({ roles: null });
};

export const getRequestById: RequestHandler = async (req, res) => {
  const requestId = parseInt(req.params.requestId);
  res.status(200).json({ requestId });
};

export const createRequest: RequestHandler = async (req, res) => {
  const { name } = req.body;
  res.status(201).json({ name });
};

export const updateRequest: RequestHandler = async (req, res) => {
  const requestId = parseInt(req.params.requestId);
  const { name } = req.body;
  res.status(200).json({ requestId, name });
};

export const deleteRequest: RequestHandler = async (req, res) => {
  // const requestId = parseInt(req.params.requestId);
  res.sendStatus(204);
};

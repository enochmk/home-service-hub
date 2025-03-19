import { RequestHandler } from 'express';

export const getAllLocations: RequestHandler = async (req, res) => {
  res.status(200).json({ roles: null });
};

export const getLocationById: RequestHandler = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  res.status(200).json({ locationId });
};

export const createLocation: RequestHandler = async (req, res) => {
  const { name } = req.body;
  res.status(201).json({ name });
};

export const updateLocation: RequestHandler = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  const { name } = req.body;
  res.status(200).json({ locationId, name });
};

export const deleteLocation: RequestHandler = async (req, res) => {
  const locationId = parseInt(req.params.locationId);
  res.sendStatus(204);
};

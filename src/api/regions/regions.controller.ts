import { RequestHandler } from 'express';

export const getAllRegions: RequestHandler = async (req, res) => {
  res.status(200).json({ roles: null });
};

export const getRegionById: RequestHandler = async (req, res) => {
  const regionId = parseInt(req.params.regionId);
  res.status(200).json({ regionId });
};

export const createRegion: RequestHandler = async (req, res) => {
  const { name } = req.body;
  res.status(201).json({ name });
};

export const updateRegion: RequestHandler = async (req, res) => {
  const regionId = parseInt(req.params.regionId);
  const { name } = req.body;
  res.status(200).json({ regionId, name });
};

export const deleteRegion: RequestHandler = async (req, res) => {
  const regionId = parseInt(req.params.regionId);
  res.sendStatus(204);
};

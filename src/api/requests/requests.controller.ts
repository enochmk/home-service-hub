import { RequestHandler } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';
import { CreateRequestInput } from './requests.schema';

const logger = getLogger('RequestsController');

export const getAllRequests: RequestHandler = async (req, res) => {
  logger.verbose('Getting all requests.');
  const data = await prisma.requests.findMany();
  logger.info('All requests retrieved.', data);
  res.status(200).json({ data });
};

export const getRequestById: RequestHandler = async (req, res) => {
  const requestId = parseInt(req.params.requestId);
  logger.verbose(`Getting request by ID: ${requestId}`);
  const data = await prisma.requests.findUnique({
    where: {
      id: requestId,
    },
  });
  logger.info('Request retrieved.', data);
  res.status(200).json(data);
};

type CreateRequest = RequestHandler<any, any, CreateRequestInput>;
export const createRequest: CreateRequest = async (req, res) => {
  logger.verbose('Creating a new request.', req.body);
  const userId = res.locals.user!.id;
  const data = { ...req.body, createdById: userId };
  const newRequest = await prisma.requests.create({
    data,
  });
  res.status(201).json(newRequest);
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

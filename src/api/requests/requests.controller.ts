import { RequestHandler } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';
import { CreateRequestInput, UpdateRequestInput } from './requests.schema';

const logger = getLogger('RequestsController');

export const getAllRequests: RequestHandler = async (req, res) => {
  logger.verbose('Getting all requests.');
  const data = await prisma.requests.findMany();
  logger.info('All requests retrieved.', data);
  res.status(200).json({ data });
};

type GetRequest = RequestHandler<{ requestId: string }>;
export const getRequestById: GetRequest = async (req, res) => {
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

type UpdateRequest = RequestHandler<{ requestId: string }, any, UpdateRequestInput>;
export const updateRequest: UpdateRequest = async (req, res) => {
  const requestId = parseInt(req.params.requestId);
  logger.verbose(`Updating request by ID: ${requestId}`, req.body);
  const data = await prisma.requests.update({
    where: {
      id: requestId,
    },
    data: req.body,
  });
  logger.info('Request updated.', data);
  res.status(200).json(data);
};

type DeleteRequest = RequestHandler<any, any, any, { requestId: string }>;
export const deleteRequest: DeleteRequest = async (req, res) => {
  const requestId = parseInt(req.params.requestId);
  logger.verbose(`Deleting request by ID: ${requestId}`);
  await prisma.requests.delete({
    where: {
      id: requestId,
    },
  });
  logger.info('Request deleted.', { requestId });
  res.sendStatus(204);
};

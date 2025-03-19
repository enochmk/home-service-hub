import { RequestHandler } from 'express';
import * as model from './user-company.model';
import { AddCompanyUserRequest, RemoveCompanyUserRequest } from './user-company.schema';
import { getLogger } from '../../utils/logger';
import createHttpError from 'http-errors';

const logger = getLogger('UserCompanyController');

export const addUserToCompany: AddCompanyUserRequest = async (req, res) => {
  logger.verbose('Adding user to company');
  const companyId = parseInt(req.params.companyId);
  const userId = req.body.userId;
  const response = await model.addUserToCompany(companyId, userId);
  logger.info('User added to company', { response });
  res.status(201).json(response);
};

export const removeUserFromCompany: RemoveCompanyUserRequest = async (req, res) => {
  const companyId = parseInt(req.params.companyId);
  const userId = parseInt(req.params.userId);
  logger.verbose('Removing user from company', { companyId, userId });
  await model.removeUserFromCompany(companyId, userId);
  logger.info('User removed from company', { companyId, userId });
  res.status(204).send();
};

export const getCompanyUsers: RequestHandler = async (req, res) => {
  const companyId = parseInt(req.params.companyId);
  logger.verbose('Fetching users by companyId', { companyId });
  const data = await model.findCompanyUsers(companyId);
  const response = data.map((item) => item.user);
  logger.info('Company Users fetched', response);
  res.status(200).json(response);
};

export const getCompanyUserByUserId: RequestHandler = async (req, res) => {
  const companyId = parseInt(req.params.companyId);
  const userId = parseInt(req.params.userId);
  logger.verbose('Fetching user by userId', { companyId, userId });
  const response = await model.findCompanyUserByCompanyIdAndUserId(companyId, userId);
  if (!response) {
    logger.warn('Company user not found', { companyId, userId });
    throw createHttpError.NotFound('Company user not found');
  }
  logger.info('Company user fetched', { response });
  res.status(200).json(response?.user);
};

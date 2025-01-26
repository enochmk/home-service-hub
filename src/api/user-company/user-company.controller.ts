import { RequestHandler } from 'express';
import * as service from './user-company.service';
import { AddCompanyUserRequest, RemoveCompanyUserRequest } from './user-company.schema';

export const addUserToCompany: AddCompanyUserRequest = async (req, res) => {
  const response = await service.addUserToCompany(req.params.companyId, req.body.userId);
  res.status(201).json(response);
};

export const removeUserFromCompany: RemoveCompanyUserRequest = async (req, res) => {
  const { companyId, userId } = req.params;
  await service.removeUserFromCompany(companyId, userId);
  res.status(204).send();
};

export const getCompanyUsers: RequestHandler = async (req, res) => {
  const { companyId } = req.params;
  const response = await service.getCompanyUsers(companyId);
  res.status(200).json(response);
};

export const getCompanyUserByUserId: RequestHandler = async (req, res) => {
  const { companyId, userId } = req.params;
  const response = await service.getCompanyUserById(companyId, userId);
  res.status(200).json(response);
};

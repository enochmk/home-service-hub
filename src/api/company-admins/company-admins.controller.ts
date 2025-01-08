import { RequestHandler } from 'express';
import * as service from './company-admins.service';
import { AddCompanyAdminRequest, RemoveCompanyAdminRequest } from './company-admins.schema';

export const addCompanyAdmin: AddCompanyAdminRequest = async (req, res) => {
  const response = await service.addCompanyAdmin(req.params.companyId, req.body.userId);
  res.status(201).json(response);
};

export const removeCompanyAdmin: RemoveCompanyAdminRequest = async (req, res) => {
  const { companyId, userId } = req.params;
  await service.removeCompanyAdmin(companyId, userId);
  res.status(204).send();
};

export const getCompanyAdmins: RequestHandler = async (req, res) => {
  const { companyId } = req.params;
  const response = await service.getCompanyAdminsByCompanyId(companyId);
  res.status(200).json(response);
};

export const getCompanyAdmin: RequestHandler = async (req, res) => {
  const { companyId, userId } = req.params;
  const response = await service.getCompanyAdminByUserId(companyId, userId);
  res.status(200).json(response);
};

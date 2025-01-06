import { RequestHandler } from 'express';
import * as service from './company-admins.service';
import { AddCompanyAdminRequest, RemoveCompanyAdminRequest } from './company-admins.schema';

export const addCompanyAdmin: AddCompanyAdminRequest = async (req, res) => {
  const { companyId } = req.params;
  const { userId } = req.body;
  const response = await service.addCompanyAdmin(companyId, userId);
  res.status(201).json(response);
};

export const removeCompanyAdmin: RemoveCompanyAdminRequest = async (req, res) => {
  const { companyId } = req.params;
  const { userId } = req.body;
  const response = await service.removeCompanyAdmin(companyId, userId);
  res.status(200).json(response);
};

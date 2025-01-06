import { RequestHandler } from 'express';
import * as service from './company-admins.service';
import { AddCompanyAdminRequest, RemoveCompanyAdminRequest } from './company-admins.schema';

export const addCompanyAdmin: AddCompanyAdminRequest = async (req, res) => {
  const response = await service.addCompanyAdmin(req.params.companyId, req.body);
  res.status(201).json(response);
};

export const removeCompanyAdmin: RemoveCompanyAdminRequest = async (req, res) => {
  const { companyId, userId } = req.params;
  const response = await service.deleteCompanyAdmin(companyId, userId);
  res.status(200).json(response);
};

export const getCompanyAdmins: RequestHandler = async (req, res) => {
  const { companyId } = req.params;
  const response = await service.getCompanyAdmins(companyId);
  res.status(200).json(response);
};

export const getCompanyAdminProfile: RequestHandler = async (req, res) => {
  const { companyId, userId } = req.params;
  const response = await service.getCompanyAdminProfile(companyId, userId);
  res.status(200).json(response);
};

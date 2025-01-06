import * as service from './company-staff.service';
import { AddCompanyStaffRequest, RemoveCompanyStaffRequest } from './company-staff.schema';
import { RequestHandler } from 'express';

export const addCompanyStaff: AddCompanyStaffRequest = async (req, res) => {
  const response = await service.addCompanyStaff(req.params.companyId, req.body);
  res.status(201).json(response);
};

export const removeCompanyStaff: RemoveCompanyStaffRequest = async (req, res) => {
  const response = await service.removeCompanyStaff(req.params.companyId, req.params.userId);
  res.status(200).json(response);
};

export const getAllCompanyStaff: RequestHandler = async (req, res) => {
  const { companyId } = req.params;
  const response = await service.getAllCompanyStaff(companyId);
  res.status(200).json(response);
};

export const getCompanyStaff: RequestHandler = async (req, res) => {
  const { companyId, userId } = req.params;
  const response = await service.getCompanyStaff(companyId, userId);
  res.status(200).json(response);
};

import * as service from './company-staff.service';
import { CreateCompanyStaffRequest, DeleteCompanyStaffRequest } from './company-staff.schema';
import { RequestHandler } from 'express';

export const createCompanyStaff: CreateCompanyStaffRequest = async (req, res) => {
  const response = await service.createCompanyStaff(req.params.companyId, req.body);
  res.status(201).json(response);
};

export const deleteCompanyStaff: DeleteCompanyStaffRequest = async (req, res) => {
  const response = await service.deleteCompanyStaff(req.params.companyId, req.params.userId);
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

import * as service from './company-staff.service';
import { AddCompanyStaffRequest, RemoveCompanyStaffRequest } from './company-staff.schema';

export const addCompanyStaff: AddCompanyStaffRequest = async (req, res) => {
  const { companyId, userId } = req.body;
  const response = await service.addCompanyStaff(companyId, userId);
  res.status(201).json(response);
};

export const removeCompanyStaff: RemoveCompanyStaffRequest = async (req, res) => {
  const { companyId, userId } = req.body;
  const response = await service.removeCompanyStaff(companyId, userId);
  res.status(200).json(response);
};

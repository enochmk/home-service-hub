import * as service from './companies.service';
import { RequestHandler } from 'express';
import { CreateCompanyRequest, UpdateCompanyRequest } from './companies.schema';

export const createCompany: RequestHandler = async (req, res) => {
  const company = await service.createCompany(req.body as CreateCompanyRequest);
  res.status(201).json(company);
};

export const updateCompany: RequestHandler = async (req, res) => {
  const company = await service.updateCompany(
    req.params.companyId,
    req.body as UpdateCompanyRequest,
  );
  res.status(200).json(company);
};

export const deleteCompany: RequestHandler = async (req, res) => {
  await service.deleteCompany(req.params.companyId);
  res.status(204).send();
};

export const getCompany: RequestHandler = async (req, res) => {
  const company = await service.getCompany(req.params.companyId);
  res.status(200).json(company);
};

export const getCompanies: RequestHandler = async (req, res) => {
  const companies = await service.getCompanies();
  res.status(200).json(companies);
};

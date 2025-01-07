import * as service from './companies.service';
import { RequestHandler } from 'express';
import { CreateCompanyRequest, GetCompanyRequest, UpdateCompanyRequest } from './companies.schema';

export const getCompanies: RequestHandler = async (req, res) => {
  const companies = await service.getCompanies();
  res.status(200).json(companies);
};

export const getCompanyById: GetCompanyRequest = async (req, res) => {
  const company = await service.getCompanyById(req.params.companyId);
  res.status(200).json(company);
};

export const createCompany: CreateCompanyRequest = async (req, res) => {
  const company = await service.createCompany(req.body);
  res.status(201).json(company);
};

export const updateCompanyById: UpdateCompanyRequest = async (req, res) => {
  const company = await service.updateCompany(req.params.companyId, req.body);
  res.status(200).json(company);
};

export const deleteCompanyById: GetCompanyRequest = async (req, res) => {
  await service.deleteCompany(req.params.companyId);
  res.status(204).send();
};

import * as model from './companies.model';
import { RequestHandler } from 'express';
import {
  CreateCompanyRequest,
  GetCompanyRequest,
  UpdateCompanyRequest,
} from './companies.schema';
import { getLogger } from '../../utils/logger';

const logger = getLogger('CompanyController');

export const createCompany: CreateCompanyRequest = async (req, res) => {
  const createdBy = res.locals.user!.id;
  const companyData = req.body;
  logger.verbose('Creating company ...', companyData);
  const response = await model.createCompany(companyData, createdBy);
  logger.info('Company created successfully', response);
  res.status(201).json(response);
};

export const getCompanies: RequestHandler = async (req, res) => {
  logger.verbose('Fetching companies ...');
  const response = await model.getCompanies();
  logger.info('Companies fetched successfully', response);
  res.status(200).json(response);
};

export const getCompanyById: GetCompanyRequest = async (req, res) => {
  const companyId = parseInt(req.params.companyId);
  logger.verbose(`Fetching company with id ${companyId} ...`);
  const company = await model.findCompanyById(companyId);
  logger.info('Company fetched successfully', { company });
  res.status(200).json(company);
};

export const updateCompanyById: UpdateCompanyRequest = async (req, res) => {
  const companyId = parseInt(req.params.companyId);
  const data = req.body;
  logger.verbose(`Updating company with id ${companyId} ...`, { data });
  const response = await model.updateCompany(companyId, data);
  logger.info('Company updated successfully', { response });
  res.status(200).json(response);
};

export const deleteCompanyById: GetCompanyRequest = async (req, res) => {
  const companyId = parseInt(req.params.companyId);
  logger.verbose(`Deleting company with id ${companyId} ...`);
  const response = await model.deleteCompany(companyId);
  logger.info('Company deleted successfully', response);
  res.status(204).send();
};

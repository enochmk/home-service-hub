import * as service from './roles.service';
import { RolePermissionRequest } from './roles.schema';
import { RequestHandler } from 'express';

export const addPermissionToRole: RolePermissionRequest = async (req, res) => {
  const { roleId } = req.params;
  const { permissionId } = req.body;
  const response = await service.addPermissionToRole(roleId, permissionId);
  res.status(200).json(response);
};

export const removePermissionFromRole: RolePermissionRequest = async (req, res) => {
  const { roleId } = req.params;
  const { permissionId } = req.body;
  const response = await service.removePermissionFromRole(roleId, permissionId);
  res.status(200).json(response);
};

export const getPermissionsByRole: RequestHandler = async (req, res) => {
  const { roleId } = req.params;
  const permissions = await service.getPermissionsByRole(roleId);
  res.status(200).json({ permissions });
};

export const getAllRoles: RequestHandler = async (req, res) => {
  const roles = await service.getAllRoles();
  res.status(200).json({ roles });
};

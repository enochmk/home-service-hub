import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import * as model from './roles.model';
import { RolePermissionRequest } from './roles.schema';

export const addPermissionToRole: RolePermissionRequest = async (req, res) => {
  const roleId = parseInt(req.params.roleId);
  const permissionId = req.body.permissionId;
  const existingPermission = await model.findPermission(roleId, permissionId);
  // ! If permission already exists, return 409 Conflict
  if (existingPermission) {
    throw new createHttpError.Conflict('Permission already added');
  }
  await model.addPermissionToRole(roleId, permissionId);
  res.status(200).json({ message: 'Permission added successfully' });
};

export const removePermissionFromRole: RolePermissionRequest = async (req, res) => {
  const roleId = parseInt(req.params.roleId);
  const permissionId = req.body.permissionId;
  const existingPermission = await model.findPermission(roleId, permissionId);
  // ! If permission not found, return 404 Not Found
  if (!existingPermission) {
    throw new createHttpError.NotFound('Permission not found in role');
  }
  await model.removePermissionFromRole(roleId, permissionId);
  res.status(200).json({ message: 'Permission removed from role successfully' });
};

export const getPermissionsByRole: RequestHandler = async (req, res) => {
  const roleId = parseInt(req.params.roleId);
  const permissions = await model.getPermissionsByRole(roleId);
  // ! If role not found, return 404 Not Found
  if (!permissions) {
    throw new createHttpError.NotFound('Role not found');
  }
  res.status(200).json({ permissions });
};

export const getAllRoles: RequestHandler = async (req, res) => {
  const data = await model.getAllRoles();
  res.status(200).json({ roles: data });
};

import * as service from './roles.service';
import { RolePermissionRequest } from './roles.schema';

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

import createHttpError from 'http-errors';
import * as model from './roles.model';

export const addPermissionToRole = async (roleId: string, permissionId: string) => {
  const existingPermission = await model.findPermission(roleId, permissionId);
  if (existingPermission) {
    throw new createHttpError.Conflict('Permission already added');
  }
  await model.addPermissionToRole(roleId, permissionId);
  return { message: 'Permission added successfully' };
};

export const removePermissionFromRole = async (roleId: string, permissionId: string) => {
  const existingPermission = await model.findPermission(roleId, permissionId);
  if (!existingPermission) {
    throw new createHttpError.NotFound('Permission not found in role');
  }
  await model.removePermissionFromRole(roleId, permissionId);
  return { message: 'Permission removed successfully' };
};

export const getPermissionsByRole = async (roleId: string) => {
  const permissions = await model.getPermissionsByRole(roleId);
  if (!permissions) {
    throw new createHttpError.NotFound('Role not found');
  }
  return permissions;
};

export const getAllRoles = async () => {
  return model.getAllRoles();
};

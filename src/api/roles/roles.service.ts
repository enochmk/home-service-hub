import * as model from './roles.model';

export const addPermissionToRole = async (roleId: string, permissionId: string) => {
  await model.addPermissionToRole(roleId, permissionId);
  return { message: 'Permission added successfully' };
};

export const removePermissionFromRole = async (roleId: string, permissionId: string) => {
  await model.removePermissionFromRole(roleId, permissionId);
  return { message: 'Permission removed successfully' };
};

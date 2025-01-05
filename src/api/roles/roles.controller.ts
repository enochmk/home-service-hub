import { ROLE_PERMISSIONS } from '../../utils/constants';
import { RolePermissionRequest } from './roles.schema';

export const addPermissionToRole: RolePermissionRequest = (req, res) => {
  const { roleId } = req.params;
  const { permissionId } = req.body;
  ROLE_PERMISSIONS[roleId].push(permissionId);
  res.status(200).json({ message: 'Permission added successfully' });
};

export const removePermissionFromRole: RolePermissionRequest = (req, res) => {
  const { roleId } = req.params;
  const { permissionId } = req.body;
  ROLE_PERMISSIONS[roleId] = ROLE_PERMISSIONS[roleId].filter((perm) => perm !== permissionId);
  res.status(200).json({ message: 'Permission removed successfully' });
};

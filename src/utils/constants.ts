export const DEFAULT_PAGE_SIZE = 10;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 100;

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const PERMISSIONS = {
  admin: 'admin',
  'users.list': 'users.list',
  'users.create': 'users.create',
  'users.edit': 'users.edit',
  'users.delete': 'users.delete',
  'users.view': 'users.view',
  'roles.addPermission': 'roles.addPermission',
  'roles.removePermission': 'roles.removePermission',
  'roles.viewPermissions': 'roles.viewPermissions',
  'roles.list': 'roles.list',
} as const;

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [PERMISSIONS.admin],
  [ROLES.USER]: [PERMISSIONS['users.view']],
} as const;

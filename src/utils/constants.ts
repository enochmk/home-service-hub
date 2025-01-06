export const DEFAULT_PAGE_SIZE = 10;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 100;

export const ROLES = {
  TECH_ADMIN: 'tech_admin',
  CLIENT: 'client',
  COMPANY_ADMIN: 'company_admin',
  COMPANY_STAFF: 'company_staff',
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
  [ROLES.TECH_ADMIN]: [PERMISSIONS.admin],
  [ROLES.CLIENT]: [PERMISSIONS['users.view']],
} as const;

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
  'company.create': 'company.create',
  'company.update': 'company.update',
  'company.delete': 'company.delete',
  'company.view': 'company.view',
} as const;

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const ROLE_PERMISSIONS = {
  [ROLES.TECH_ADMIN]: [PERMISSIONS.admin],
  [ROLES.CLIENT]: [PERMISSIONS['users.view']],
  [ROLES.COMPANY_ADMIN]: [
    PERMISSIONS['company.create'],
    PERMISSIONS['company.update'],
    PERMISSIONS['company.delete'],
    PERMISSIONS['company.view'],
  ],
} as const;

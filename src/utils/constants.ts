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
  'company.create-user': 'company.create-user',
  'company.update-user': 'company.update-user',
  'company.delete-user': 'company.delete-user',
  'company.view-user': 'company.view-user',
  'company.view-users': 'company.view-users',
  'regions.create': 'regions.create',
  'regions.update': 'regions.update',
  'regions.delete': 'regions.delete',
  'regions.view': 'regions.view',
  'regions.list': 'regions.list',
  'locations.create': 'locations.create',
  'locations.update': 'locations.update',
  'locations.delete': 'locations.delete',
  'locations.view': 'locations.view',
  'locations.list': 'locations.list',
} as const;

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const ROLE_PERMISSIONS = {
  [ROLES.TECH_ADMIN]: [PERMISSIONS.admin],
  [ROLES.COMPANY_ADMIN]: [
    PERMISSIONS['company.create-user'],
    PERMISSIONS['company.update-user'],
    PERMISSIONS['company.delete-user'],
    PERMISSIONS['company.view-user'],
    PERMISSIONS['company.view-users'],
    PERMISSIONS['users.edit'],
    PERMISSIONS['users.create'],
    PERMISSIONS['users.delete'],
    PERMISSIONS['users.view'],
    PERMISSIONS['users.list'],
  ],
} as const;

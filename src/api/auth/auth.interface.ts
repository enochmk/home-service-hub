export interface IUserSessionData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleId: string;
  roleName: string;
  permissions: string[];
  [key: string]: any;
}

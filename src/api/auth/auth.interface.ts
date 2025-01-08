export interface IUserSessionData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleId: string;
  roleName: string;
  shouldUpdatePassword: boolean;
  permissions: string[];
  active?: boolean;
  company?: {
    id: string;
    name: string;
  };
  [key: string]: any;
}

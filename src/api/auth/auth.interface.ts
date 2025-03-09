export interface IUserSessionData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleId: number;
  roleName: string;
  shouldUpdatePassword: boolean;
  permissions: string[];
  active?: boolean;
  company?: {
    id: number;
    name: string;
  };
  [key: string]: any;
}

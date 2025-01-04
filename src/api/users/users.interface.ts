export interface FindUsersParams {
  limit?: number;
  page?: number;
  sort?: 'asc' | 'desc';
  email?: string;
  firstName?: string;
  lastName?: string;
}

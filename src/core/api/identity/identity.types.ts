import { Organization } from '../organizations/organizations.types';
import { User } from '../users/users.types';

export type UserType = 'users' | 'organizations';

export interface IdentityRes {
  users: User;
  organizations: Organization[];
}

export interface Identity {
  id: string;
  type: UserType;
  meta: User | Organization;
  updated_at: Date;
  created_at: Date;
}

import { UserType } from 'src/core/api';

export interface UserReq {
  avatarId?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface User extends UserReq {
  id: string;
  avatar: { url?: string; id?: string };
  type?: UserType;
}

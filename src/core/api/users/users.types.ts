import { Media } from '../media/media.types';

export interface UserReq {
  avatar_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface User extends UserReq {
  id: string;
  avatar?: Media;
  identity_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

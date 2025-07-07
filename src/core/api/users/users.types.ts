import { MediaRes } from '../media/media.types';

export interface UserReq {
  avatar_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface User extends UserReq {
  id: string;
  avatar?: MediaRes;
  identity_verified_at: Date | null;
  impact_points: number;
  created_at: Date;
  updated_at: Date;
}

export interface ForgetPasswordReq {
  current_password?: string;
  password: string;
}

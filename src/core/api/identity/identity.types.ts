import { MediaRes } from '../media/media.types';
import { VerificationStatus } from '../verification/verification.types';

export type UserType = 'users' | 'organizations';

export interface OrgMeta {
  id: string;
  name: string;
  shortname: string;
  email: string;
  website: string;
  bio: string;
  logo: MediaRes | null;
  logo_id: string;
  description?: string;
  country: string;
  city: string;
  wallet_address?: string;
  status: VerificationStatus;
  verified: boolean;
  verified_impact: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserMeta {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  bio: string;
  email: string;
  avatar: MediaRes | null;
  avatar_id: string;
  country: string;
  city: string;
  status: VerificationStatus;
  identity_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface IdentityRes {
  users: UserMeta;
  organizations: OrgMeta[];
}

import { Media } from '../media/media.types';
import { User } from '../users/users.types';

export type OrgVerificationStatus = 'NOT_ACTIVE' | 'PENDING' | 'ACTIVE';

export type UserVerificationStatus = 'CREATED' | 'REQUESTED' | 'VERIFIED' | 'FAILED';

export interface KYBReq {
  documents: string[];
}

export interface KYBRes {
  id: string;
  user_id: string;
  organization_id: string;
  status: OrgVerificationStatus;
  documents: Media[];
  created_at: Date;
  updated_at: Date;
}

export interface KYCRes {
  id: string;
  name: string;
  description: string;
  user_id: string;
  user: User;
  connection_url: string;
  connection_id: string;
  status: UserVerificationStatus;
  validation_error: string;
  created_at: Date;
  updated_at: Date;
  verified_at?: Date;
  connection_at?: Date;
}

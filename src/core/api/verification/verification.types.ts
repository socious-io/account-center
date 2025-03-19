import { Media } from '../media/media.types';

export type VerificationStatus = 'NOT_ACTIVE' | 'PENDING' | 'ACTIVE';

export interface KYBReq {
  documents: string[];
}

export interface KYBRes {
  id: string;
  user_id: string;
  organization_id: string;
  status: VerificationStatus;
  documents: Media[];
  created_at: Date;
  updated_at: Date;
}

export interface KYCRes {
  id: string;
  status: string;
  identity_id: string;
  connection_id: string;
  connection_url: string;
  short_url: string;
  present_id: string;
  created_at: Date;
  updated_at: Date;
}

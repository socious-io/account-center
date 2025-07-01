import { MediaRes } from '../media/media.types';

export type OrgVerificationStatus = 'NOT_ACTIVE' | 'PENDING' | 'ACTIVE';

export interface KYBReq {
  documents: string[];
}

export interface KYBRes {
  id: string;
  user_id: string;
  organization_id: string;
  status: OrgVerificationStatus;
  documents: MediaRes[];
  created_at: Date;
  updated_at: Date;
}

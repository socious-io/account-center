import { Media } from '../media/media.types';
import { PaginateRes } from '../types';
import { VerificationStatus } from '../verification/verification.types';

export interface OrganizationReq {
  logo_id?: string;
  name: string;
  username: string;
  email: string;
}

export interface Organization extends OrganizationReq {
  id: string;
  logo?: Media;
  logo_id?: string;
  is_verified: boolean;
  verification_status: VerificationStatus | null;
  created_at: Date;
  updated_at: Date;
}

export interface OrganizationRes extends PaginateRes {
  results: Organization[];
}

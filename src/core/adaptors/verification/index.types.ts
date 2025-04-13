import { OrgVerificationStatus, UserVerificationStatus } from 'src/core/api';

export interface KYB {
  status: OrgVerificationStatus;
}

export type KYCStatus = '' | 'succeed' | 'failed' | 'exceeded';

export interface KYC {
  id: string;
  connectURL: string;
  status: UserVerificationStatus;
  validationError?: string;
}

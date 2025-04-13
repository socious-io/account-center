import { OrgVerificationStatus, UserVerificationStatus } from 'src/core/api';

export interface KYB {
  status: OrgVerificationStatus;
}

export type KYCStatus = '' | 'succeed' | 'failed';

export interface KYC {
  id: string;
  connectURL: string;
  status: UserVerificationStatus;
}

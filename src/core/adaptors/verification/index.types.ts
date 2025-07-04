import { OrgVerificationStatus, CredentialStatus } from 'src/core/api';

export interface KYB {
  status: OrgVerificationStatus;
}

export type KYCStatus = 'inactive' | 'succeed' | 'failed' | 'exceeded';

export interface KYC {
  id: string;
  connectURL: string;
  status: CredentialStatus;
  validationError?: string;
}

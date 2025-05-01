import { UserVerificationStatus } from 'src/core/api';

export type KYCStatus = '' | 'succeed' | 'failed';

export interface KYC {
  id: string;
  connectURL: string;
  status: UserVerificationStatus;
}

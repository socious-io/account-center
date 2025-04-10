import { KYCStatus } from 'src/core/adaptors';

export interface KYCProps {
  connectUrl: string;
  status: KYCStatus;
}

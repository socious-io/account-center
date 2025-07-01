import { User } from '../users/users.types';

export type CredentialType = 'KYC' | 'BADGES';

export type CredentialStatus = 'CREATED' | 'REQUESTED' | 'VERIFIED' | 'FAILED';

export interface CredentialRes {
  id: string;
  name: string;
  description: string;
  user_id: string;
  user: User;
  connection_url: string;
  connection_id: string;
  status: CredentialStatus;
  validation_error: string;
  created_at: Date;
  updated_at: Date;
  verified_at?: Date;
  connection_at?: Date;
}

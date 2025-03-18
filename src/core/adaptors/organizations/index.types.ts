import { UserType, VerificationStatus } from 'src/core/api';

export interface OrgReq {
  logoId?: string;
  name: string;
  username: string;
  email: string;
}

export interface Org extends OrgReq {
  id: string;
  logo: { url?: string; id?: string };
  isVerified?: boolean;
  verificationStatus: VerificationStatus | null;
  type?: UserType;
}

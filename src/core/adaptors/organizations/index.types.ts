import { UserType, OrgVerificationStatus } from 'src/core/api';

export interface OrgReq {
  logoId?: string;
  name: string;
  username: string;
  email: string;
}

export interface Org extends OrgReq {
  id: string;
  logo: { url?: string; id?: string };
  verified?: boolean;
  verificationStatus: OrgVerificationStatus | null;
  type?: UserType;
}

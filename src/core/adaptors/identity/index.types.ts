import { UserType, OrgVerificationStatus } from 'src/core/api';

export interface CurrentIdentity {
  id: string;
  name: string;
  username: string;
  type: UserType;
  firstName?: string | null;
  lastName?: string | null;
  img?: string;
  imgId?: string;
  email?: string;
  current?: boolean;
  verified?: boolean;
  verificationStatus?: OrgVerificationStatus | null;
}

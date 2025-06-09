import { MediaRes } from '../media/media.types';

export interface UserReq {
  avatar_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface User extends UserReq {
  id: string;
  avatar?: MediaRes;
  identity_verified_at: Date | null;
  impact_points: number;
  created_at: Date;
  updated_at: Date;
}

export interface ForgetPasswordReq {
  current_password?: string;
  password: string;
}

export interface StripeLinkReq {
  country: string;
  redirect_url?: string;
}

export interface StripeLinkRes {
  link: {
    url: string;
    expires_at: Date;
  };
}

export interface StripeAccountRes {
  id: string;
  account: string;
  account_holder_name: string;
  account_holder_type: null;
  account_type: string;
  bank_name: string;
  last4: string;
}

export interface StripeProfileRes {
  id: string;
  external_accounts: {
    data: StripeAccountRes[];
    url: string;
  };
}

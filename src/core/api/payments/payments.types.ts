import { PaymentMethod } from '@stripe/stripe-js';

export type CardReq = {
  token: string;
};

export interface CardsRes {
  cards: PaymentMethod[];
}

export interface StripeLinkReq {
  country: string;
  redirect_url?: string;
}

export interface StripeLinkRes {
  url: {
    url: string;
    expires_at: Date;
  };
}

export interface StripeAccount {
  id: string;
  account: string;
  account_holder_name: string;
  account_holder_type: null;
  account_type: string;
  bank_name: string;
  last4: string;
}

export interface StripeAccountsRes {
  id: string;
  external_accounts: {
    data: StripeAccount[];
    url: string;
  };
}

export type WalletReq = {
  chain: string;
  chain_id: string;
  address: string;
};

export interface WalletRes extends WalletReq {
  id: string;
  identity_id: string;
  created_at: Date;
  updated_at: Date;
}

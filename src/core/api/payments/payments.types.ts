import { PaymentMethod } from '@stripe/stripe-js';

export type CardReq = {
  token: string;
};

export interface CardsRes {
  cards: PaymentMethod[];
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

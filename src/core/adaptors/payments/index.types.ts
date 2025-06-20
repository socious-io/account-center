import { PaginateRes } from '..';

export interface CardReq {
  token: string;
}

export interface Card {
  id: string;
  exp_month: number;
  exp_year: number;
  last4: string;
  brand: string;
}

export type Cards = PaginateRes<Card>;

export interface StripeAccount {
  account: string;
  bankName: string;
  last4: string;
}

export type WalletReq = {
  chain: string;
  chain_id: string;
  address: string;
};

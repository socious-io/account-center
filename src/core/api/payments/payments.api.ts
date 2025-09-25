import { PaymentMethod } from '@stripe/stripe-js';

import { get, post, del } from '../http';
import { FilterReq, SuccessRes } from '../types';
import {
  CardsRes,
  CardReq,
  WalletReq,
  WalletRes,
  StripeLinkRes,
  StripeLinkReq,
  StripeAccountsRes,
} from './payments.types';

export async function cards(params?: FilterReq): Promise<CardsRes> {
  return (await get<CardsRes>('payments/fiat/cards', { params })).data;
}

export async function addCard(payload: CardReq): Promise<PaymentMethod> {
  return (await post<PaymentMethod>('payments/fiat/cards', payload)).data;
}

export async function removeCard(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`payments/fiat/cards/${id}`)).data;
}

export async function getStripeLink(params: StripeLinkReq): Promise<StripeLinkRes> {
  return (await get<StripeLinkRes>('/payments/fiat/payout/connect', { params })).data;
}

export async function getStripeAccount(): Promise<StripeAccountsRes> {
  return (await get<StripeAccountsRes>('/payments/fiat/payout')).data;
}

export async function getWallets(): Promise<WalletRes[]> {
  return (await get<WalletRes[]>('payments/crypto/wallets')).data;
}

export async function setWallet(payload: WalletReq): Promise<WalletRes> {
  return (await post<WalletRes>('payments/crypto/wallets', payload)).data;
}

import { PaymentMethod } from '@stripe/stripe-js';

import { get, post, del } from '../http';
import { FilterReq, SuccessRes } from '../types';
import { CardsRes, CardReq, WalletReq, WalletRes } from './payments.types';

export async function cards(params?: FilterReq): Promise<CardsRes> {
  return (await get<CardsRes>('payments/cards', { params })).data;
}

export async function addCard(payload: CardReq): Promise<PaymentMethod> {
  return (await post<PaymentMethod>('payments/cards', payload)).data;
}

export async function removeCard(id: string): Promise<SuccessRes> {
  return (await del<SuccessRes>(`payments/cards/${id}`)).data;
}

export async function setWallet(payload: WalletReq): Promise<WalletRes> {
  return (await post<WalletRes>('payments/wallets', payload)).data;
}

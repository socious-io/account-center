import { Card } from '@stripe/stripe-js';

import { get, post, del } from '../http';
import { FilterReq } from '../types';
import { CardsRes, CardReq } from './payments.types';

export async function cards(params?: FilterReq): Promise<CardsRes> {
  return (await get<CardsRes>('payments/cards', { params })).data;
}

export async function cardById(id: string): Promise<Card> {
  return (await get<Card>(`payments/cards/${id}`)).data;
}

export async function addCard(payload: CardReq): Promise<Card> {
  return (await post<Card>('payments/cards', payload)).data;
}

export async function updateCard(id: string, payload: Card): Promise<Card> {
  return (await post<Card>(`payments/cards/update/${id}`, payload)).data;
}

export async function removeCard(id: string): Promise<Card> {
  return (await del<Card>(`payments/cards/remove/${id}`)).data;
}

import { get, post } from '../http';
import { FilterReq, SuccessRes } from '../types';
import { Card, CardReq, CardsRes } from './payments.types';

export async function cards(params?: FilterReq): Promise<CardsRes> {
  return (await get<CardsRes>('payments/cards', { params })).data;
}

export async function cardById(id: string): Promise<CardsRes> {
  return (await get<CardsRes>(`payments/cards/${id}`)).data;
}

export async function addCard(payload: CardReq, is_jp?: boolean): Promise<Card> {
  return (await post<Card>('payments/cards', payload, { params: { is_jp } })).data;
}

export async function updateCard(id: string, payload: CardReq): Promise<Card> {
  return (await post<Card>(`payments/cards/update/${id}`, payload)).data;
}

export async function removeCard(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`payments/cards/remove/${id}`, {})).data;
}

import { Card as StripeCard } from '@stripe/stripe-js';

import { PaginateRes } from '../types';

export interface CardReq {
  meta: Partial<StripeCard>;
  token?: string;
  holder_name?: string;
}

export interface Card extends CardReq {
  id: string;
  created_at: Date;
}

export interface CardsRes extends PaginateRes {
  items: Card[];
}

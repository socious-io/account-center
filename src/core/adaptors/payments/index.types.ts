import { Card as StripeCard } from '@stripe/stripe-js';

import { PaginateRes } from '..';

export interface CardReq {
  meta: Partial<StripeCard>;
  token?: string;
  name?: string;
}

export interface Card extends CardReq {
  id: string;
  date: Date;
}

export type Cards = PaginateRes<Card>;

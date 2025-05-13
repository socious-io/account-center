import { Card } from '@stripe/stripe-js';

import { PaginateRes } from '../types';

export type CardReq = {
  source: string;
};

export interface CardsRes extends PaginateRes {
  items: Card[];
}

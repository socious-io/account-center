import { addCard, removeCard } from 'src/core/api';

import { AdaptorRes, Cards, Card } from '..';

export const getCardsAdaptor = async (limit = 10, page = 1): Promise<AdaptorRes<Cards>> => {
  try {
    //FIXME: later with API BE
    // const { items: cardItems } = await cards({ limit, page });
    // const results = cardItems.map(card => ({
    //   id: card.id,
    //   name: card.name || '',
    //   exp_month: card.exp_month,
    //   exp_year: card.exp_year,
    //   last4: card.last4,
    //   brand: card.brand,
    // }));
    const results = [
      {
        id: 'card_1QmzNHFiHSKRe5D1vMtwpoSK',
        name: '',
        exp_month: 12,
        exp_year: 2034,
        last4: '4242',
        brand: 'Visa',
      },
      {
        id: 'card_1QmzNHFiHSKRe6D1vMtwpoSK',
        name: '',
        exp_month: 12,
        exp_year: 2034,
        last4: '5555',
        brand: 'Mastercard',
      },
      {
        id: 'card_1QmzNHFiHSKRe7D1vMtwpoSK',
        name: '',
        exp_month: 12,
        exp_year: 2034,
        last4: '4545',
        brand: 'Wechat',
      },
    ];
    return {
      data: {
        results,
        page,
        limit,
        total: 3,
      },
      error: null,
    };
  } catch (error: unknown) {
    console.error('Error in getting Cards', error);
    return { data: null, error: 'Error in getting Cards' };
  }
};

export const addCardAdaptor = async (tokenId: string): Promise<AdaptorRes<Card>> => {
  try {
    const card = await addCard({ source: tokenId });
    const data = {
      id: card.id,
      name: card.name || '',
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      last4: card.last4,
      brand: card.brand,
    };
    return { data, error: null };
  } catch (error) {
    console.error('Error in adding a new card', error);
    return { data: null, error: 'Error in adding a new card' };
  }
};

export const removeCardAdaptor = async (cardId: string): Promise<AdaptorRes<Card>> => {
  try {
    const card = await removeCard(cardId);
    const data = {
      id: card.id,
      name: card.name || '',
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      last4: card.last4,
      brand: card.brand,
    };
    return { data, error: null };
  } catch (error) {
    console.error('Error in removing card', error);
    return { data: null, error: 'Error in removing card' };
  }
};

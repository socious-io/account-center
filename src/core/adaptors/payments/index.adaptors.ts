import { addCard } from 'src/core/api';

import { AdaptorRes, CardReq, Cards, CustomError, SuccessRes } from '..';

export const addCardAdaptor = async (payload: CardReq, is_jp: boolean): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await addCard(payload, is_jp);
    return { data: { message: 'succeed' }, error: null };
  } catch (error: unknown) {
    console.error('Error in adding New Card', error);
    return { data: null, error: (error as CustomError).response.data.error || 'Failed!' };
  }
};

export const getCardsAdaptor = async (
  page = 1,
  limit = 10,
  filters?: { is_jp: boolean },
): Promise<AdaptorRes<Cards>> => {
  try {
    //FIXME: needs BE API
    // const { items } = await cards({ page, limit, filters });
    // const data = items.map(item => ({
    //   id: item.id,
    //   token: item.token,
    //   name: item.holder_name,
    //   meta: item.meta,
    //   date: item.created_at,
    // }));
    console.log(filters);
    const results = [
      {
        id: '4f6c2ae6-39f8-4bdf-9c8c-01ad38772150',
        date: new Date('2025-01-30T15:10:01.037Z'),
        meta: {
          id: 'card_1QmzNHFiHSKRe5D1vMtwpoSK',
          name: null,
          brand: 'Visa',
          last4: '4242',
          object: 'card' as const,
          wallet: null,
          country: 'US',
          funding: 'credit',
          exp_year: 2034,
          networks: {
            preferred: null,
          },
          cvc_check: 'unchecked',
          exp_month: 12,
          address_zip: null,
          address_city: null,
          address_line1: null,
          address_line2: null,
          address_state: null,
          dynamic_last4: null,
          address_country: null,
          regulated_status: 'unregulated',
          address_zip_check: null,
          address_line1_check: null,
          tokenization_method: null,
        },
      },
      {
        id: '4f6c2ae6-39f8-4bdf-9c8c-01ad38772151',
        date: new Date('2025-01-30T15:10:01.037Z'),
        meta: {
          id: 'card_1QmzNHFiHSKRe5D1vMtwpoSK',
          name: null,
          brand: 'Mastercard',
          last4: '5555',
          object: 'card' as const,
          wallet: null,
          country: 'US',
          funding: 'credit',
          exp_year: 2034,
          networks: {
            preferred: null,
          },
          cvc_check: 'unchecked',
          exp_month: 12,
          address_zip: null,
          address_city: null,
          address_line1: null,
          address_line2: null,
          address_state: null,
          dynamic_last4: null,
          address_country: null,
          regulated_status: 'unregulated',
          address_zip_check: null,
          address_line1_check: null,
          tokenization_method: null,
        },
      },
      {
        id: '4f6c2ae6-39f8-4bdf-9c8c-01ad38772134',
        date: new Date('2025-01-30T15:10:01.037Z'),
        meta: {
          id: 'card_1QmzNHFiHSKRe5D1vMtwpoSK',
          name: null,
          brand: 'Wechat',
          last4: '4444',
          object: 'card' as const,
          wallet: null,
          country: 'US',
          funding: 'credit',
          exp_year: 2034,
          networks: {
            preferred: null,
          },
          cvc_check: 'unchecked',
          exp_month: 12,
          address_zip: null,
          address_city: null,
          address_line1: null,
          address_line2: null,
          address_state: null,
          dynamic_last4: null,
          address_country: null,
          regulated_status: 'unregulated',
          address_zip_check: null,
          address_line1_check: null,
          tokenization_method: null,
        },
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

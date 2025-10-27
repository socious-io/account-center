import { addCard, cards, getStripeAccount, getStripeLink, getWallets, removeCard, setWallet } from 'src/core/api';

import { AdaptorRes, Cards, Card, SuccessRes, WalletReq, CustomError, StripeAccount, Wallet } from '..';

export const getCardsAdaptor = async (limit = 10, page = 1): Promise<AdaptorRes<Cards>> => {
  try {
    const { cards: cardItems } = await cards({ limit, page });
    const results = cardItems.map(card => ({
      id: card.id,
      exp_month: card.card?.exp_month || 0,
      exp_year: card.card?.exp_year || 0,
      last4: card.card?.last4 || '',
      brand: card.card?.brand || '',
    }));
    return {
      data: {
        results,
        page,
        limit,
        total: cardItems.length || 0,
      },
      error: null,
    };
  } catch (error: unknown) {
    console.error('Error in getting Cards', error);
    return { data: null, error: 'Error in getting Cards' };
  }
};

export const addCardAdaptor = async (token: string): Promise<AdaptorRes<Card>> => {
  try {
    const { id, card } = await addCard({ token });
    const data = {
      id,
      exp_month: card?.exp_month || 0,
      exp_year: card?.exp_year || 0,
      last4: card?.last4 || '',
      brand: card?.brand || '',
    };
    return { data, error: null };
  } catch (error) {
    console.error('Error in adding a new card', error);
    return { data: null, error: 'Error in adding a new card' };
  }
};

export const removeCardAdaptor = async (cardId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await removeCard(cardId);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in removing card', error);
    return { data: null, error: 'Error in removing card' };
  }
};

export const getStripAccountsAdaptor = async (): Promise<AdaptorRes<StripeAccount[]>> => {
  try {
    const { external_accounts } = await getStripeAccount();
    const data = external_accounts.data.map(account => ({
      account: account.account,
      bankName: account.bank_name,
      last4: account.last4,
    }));
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting user stripe accounts', error);
    return { data: null, error: 'Error in getting user stripe accounts' };
  }
};

export const getStripeLinkAdaptor = async (country: string, redirect_url: string): Promise<AdaptorRes<string>> => {
  try {
    const { url } = await getStripeLink({ country, redirect_url });
    return {
      data: url.url,
      error: null,
    };
  } catch (error: unknown) {
    console.error('Error in getting stripe link', error);
    return {
      data: null,
      error:
        (error as CustomError).response.data.error || (error as CustomError)?.message || 'Error in getting stripe link',
    };
  }
};

export const getWalletsAdaptor = async (): Promise<AdaptorRes<Wallet[]>> => {
  try {
    const data = await getWallets();
    return { data, error: null };
  } catch (error) {
    console.error('Error in getting user wallets', error);
    return { data: null, error: 'Error in getting user wallets' };
  }
};

export const setWalletAdaptor = async (payload: WalletReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await setWallet(payload);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in setting a new wallet', error);
    return { data: null, error: 'Error in setting a new wallet' };
  }
};

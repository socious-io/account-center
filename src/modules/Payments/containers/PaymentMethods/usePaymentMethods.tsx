import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import {
  Cards,
  CurrentIdentity,
  getCurrentIdentityAdaptor,
  removeCardAdaptor,
  setWalletAdaptor,
  StripeAccount,
  WalletReq,
} from 'src/core/adaptors';
import { RootState } from 'src/store';

export const usePaymentMethods = () => {
  const { cards, stripeAccounts } = (useLoaderData() as { cards: Cards; stripeAccounts: StripeAccount[] }) || {};
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const { name: currentIdentityName, type: currentIdentityType } = getCurrentIdentityAdaptor(currentIdentity);
  const [currentList, setCurrentList] = useState(cards?.results || []);
  const [openModal, setOpenModal] = useState<{ name: 'add-account' | 'add-card' | ''; open: boolean }>({
    name: '',
    open: false,
  });

  const handleCloseModal = () => setOpenModal({ ...openModal, open: false });

  const onRemoveCard = async (cardId: string) => {
    const { error, data } = await removeCardAdaptor(cardId);
    if (error) return;
    if (data) {
      const filteredList = currentList.filter(list => list.id !== cardId);
      setCurrentList(filteredList);
    }
  };

  const onSetWallet = async (payload: WalletReq) => {
    await setWalletAdaptor(payload);
  };

  return {
    data: {
      currentList,
      currentIdentityName,
      currentIdentityType,
      openModal,
      stripeAccounts,
    },
    operations: {
      setCurrentList,
      setOpenModal,
      handleCloseModal,
      onRemoveCard,
      onSetWallet,
    },
  };
};

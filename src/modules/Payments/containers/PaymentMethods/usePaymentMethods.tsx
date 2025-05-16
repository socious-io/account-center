import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Cards, CurrentIdentity, getCurrentIdentityAdaptor } from 'src/core/adaptors';
import Connect from 'src/modules/General/components/ConnectButton';
import { RootState } from 'src/store';

export const usePaymentMethods = () => {
  const { cards } = useLoaderData() as { cards: Cards };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const { name: currentIdentityName, type: currentIdentityType } = getCurrentIdentityAdaptor(currentIdentity);
  const [currentCardsList] = useState(cards);
  // const PER_PAGE = 10;
  // const [page] = useState(currentCardsList.page || 1);
  const currentList = currentCardsList.results || [];
  const { ConnectButton } = Connect();

  // const fetchMore = async (newPage: number) => {
  //   const { error, data } = await getCardsAdaptor(newPage, PER_PAGE);
  //   if (error) return;
  //   if (data) {
  //     setCurrentCardsList(prev => ({
  //       ...prev,
  //       results: [...prev.results, ...(data?.results || [])],
  //       page: newPage || 1,
  //       limit: data.limit || PER_PAGE,
  //       total: data.total || 0,
  //     }));
  //   }
  // };

  // useEffect(() => {
  //   if (page === currentCardsList.page) return;
  //   fetchMore(page);
  // }, [page]);

  return {
    data: {
      currentList,
      currentIdentityName,
      currentIdentityType,
      ConnectButton,
    },
  };
};

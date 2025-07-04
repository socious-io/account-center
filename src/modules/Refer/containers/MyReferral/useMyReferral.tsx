import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getMyReferralAdaptor, MyReferralRes } from 'src/core/adaptors';

export const useMyReferral = () => {
  const { referralList } = useLoaderData() as { referralList: MyReferralRes };
  const PER_PAGE = 10;
  const [currentReferralList, setCurrentReferralList] = useState(referralList);
  const currentList = currentReferralList?.results || [];
  const totalPage = Math.ceil((currentReferralList?.total || 1) / (currentReferralList?.limit || PER_PAGE));
  const [page, setPage] = useState(1);

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { error, data } = await getMyReferralAdaptor(newPage, PER_PAGE);
    if (error) return;
    if (data) setCurrentReferralList(data);
  };

  return {
    data: {
      currentList,
      page,
      totalPage,
    },
    operations: {
      onChangePage,
    },
  };
};

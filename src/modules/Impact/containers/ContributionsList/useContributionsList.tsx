import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ContributionsRes, getContributionsAdaptor } from 'src/core/adaptors';

export const useContributionsList = () => {
  const { contributionsList } = useLoaderData() as { contributionsList: ContributionsRes };
  const PER_PAGE = 10;
  const [currentContributionsList, setCurrentContributionsList] = useState(contributionsList);
  const currentList = currentContributionsList?.results || [];
  const totalPage = Math.ceil((currentContributionsList?.total || 1) / (currentContributionsList?.limit || PER_PAGE));
  const [page, setPage] = useState(1);

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { error, data } = await getContributionsAdaptor(newPage, PER_PAGE);
    if (error) return;
    if (data) setCurrentContributionsList(data);
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

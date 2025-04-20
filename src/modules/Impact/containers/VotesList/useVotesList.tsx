import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getVotesAdaptor, VotesRes } from 'src/core/adaptors';

export const useVotesList = () => {
  const { votesList } = useLoaderData() as { votesList: VotesRes };
  const PER_PAGE = 10;
  const [currentVotesList, setCurrentVotesList] = useState(votesList);
  const currentList = currentVotesList?.results || [];
  const totalPage = Math.ceil((currentVotesList?.total || 1) / (currentVotesList?.limit || PER_PAGE));
  const [page, setPage] = useState(1);

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { error, data } = await getVotesAdaptor(newPage, PER_PAGE);
    if (error) return;
    if (data) setCurrentVotesList(data);
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

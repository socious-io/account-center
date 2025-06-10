import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useLoaderData } from 'react-router-dom';
import { ReferOverviews } from 'src/core/adaptors';

export const useReferOverview = () => {
  const { overviews } = useLoaderData() as { overviews: ReferOverviews };
  const { achievements, totalRewards, unclaimedRewards, totalReferrals } = overviews || {};
  const [isExpanded, setIsExpanded] = useState<{ claimed: boolean; unclaimed: boolean }>({
    claimed: !isMobile,
    unclaimed: !isMobile,
  });

  const handleToggleSeeMore = (name: 'claimed' | 'unclaimed') => {
    setIsExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleClaimClick = () => {
    window.open('https://docs.google.com/forms/d/1C7ccgjVK3jMRq0TwORbuz8A6MclDzn2pG1YS-9ma09s/edit', '_blank');
  };

  return {
    data: {
      achievements,
      totalRewards,
      unclaimedRewards,
      totalReferrals,
      isClaimedExpanded: isExpanded['claimed'],
      isUnclaimedExpanded: isExpanded['unclaimed'],
    },
    operations: {
      handleClaimClick,
      handleToggleSeeMore,
    },
  };
};

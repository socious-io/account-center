import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { BADGES } from 'src/constants/BADGES';
import { AchievementsRes, CurrentIdentity, getCurrentIdentityAdaptor, Impact } from 'src/core/adaptors';
import { getTierDetails } from 'src/core/helpers/getTierDetails';
import { RootState } from 'src/store';

const useDetails = () => {
  const { impact, achievementsList } = useLoaderData() as { impact: Impact; achievementsList: AchievementsRes };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const { img: currentIdentityProfile, impactPoints } = getCurrentIdentityAdaptor(currentIdentity);
  const currentIdentityImpactPoints = impactPoints || 0;
  const { tier, progressPercent, pointsLeft } = getTierDetails(currentIdentityImpactPoints);
  const isLastTier = tier >= 12;
  const badges = achievementsList.map(achievement => ({
    id: achievement.name,
    image: `/images/achievements/${BADGES[achievement.name].iconName}.svg`,
  }));
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const handleToggle = () => setIsExpanded(prev => !prev);

  return {
    data: {
      impact,
      currentIdentityProfile,
      currentIdentityImpactPoints,
      tier,
      isLastTier,
      pointsLeft,
      progressPercent,
      badges,
      isExpanded,
    },
    operations: {
      handleToggle,
    },
  };
};
export default useDetails;

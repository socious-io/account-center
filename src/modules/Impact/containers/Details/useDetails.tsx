import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, getCurrentIdentityAdaptor, Impact } from 'src/core/adaptors';
import { getTierDetails } from 'src/core/helpers/getTierDetails';
import { RootState } from 'src/store';

const useDetails = () => {
  const { impact } = useLoaderData() as { impact: Impact };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const { img: currentIdentityProfile, impactPoints } = getCurrentIdentityAdaptor(currentIdentity);
  const currentIdentityImpactPoints = impactPoints || 0;
  const { tier, progressPercent, pointsLeft } = getTierDetails(currentIdentityImpactPoints);
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const handleToggle = () => setIsExpanded(prev => !prev);

  return {
    data: {
      impact,
      currentIdentityProfile,
      currentIdentityImpactPoints,
      tier,
      pointsLeft,
      progressPercent,
      isExpanded,
    },
    operations: {
      handleToggle,
    },
  };
};
export default useDetails;

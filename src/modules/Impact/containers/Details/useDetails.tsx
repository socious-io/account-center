import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, getCurrentIdentityAdaptor, Impact } from 'src/core/adaptors';
import { RootState } from 'src/store';

const useDetails = () => {
  const { impact } = useLoaderData() as { impact: Impact };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const { img: currentIdentityProfile } = getCurrentIdentityAdaptor(currentIdentity);
  //FIXME: replace with real data
  const currentIdentityImpactPoints = 1276;
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const handleToggle = () => setIsExpanded(prev => !prev);

  return {
    data: {
      impact,
      currentIdentityProfile,
      currentIdentityImpactPoints,
      isExpanded,
    },
    operations: {
      handleToggle,
    },
  };
};
export default useDetails;

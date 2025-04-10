import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useVerifyTopBanner = () => {
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const type = currentIdentity?.type;
  const verified = currentIdentity?.verified;
  const pendingOrgVerification = currentIdentity?.verificationStatus === 'PENDING';
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');

  const onDismiss = () => {
    localStorage.setItem('hideVerifiedBanner', 'true');
    setHideVerifyBanner(true);
  };

  const navigateToVerify = () => (type === 'users' ? navigate('/verification') : console.log('navigate to KYB page'));

  return {
    data: { type, verified, hideVerifyBanner, pendingOrgVerification },
    operations: { onDismiss, navigateToVerify },
  };
};

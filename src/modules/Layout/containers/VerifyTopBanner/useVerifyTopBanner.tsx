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

  const onVerifyIdentity = (connectUrl?: string) => navigate(`/verify?url=${connectUrl}`);

  const onDismiss = () => {
    localStorage.setItem('hideVerifiedBanner', 'true');
    setHideVerifyBanner(true);
  };

  const getConnectUrl = async () => {
    // const vc = await requestVerification();
    // onVerifyIdentity(vc.short_url);
    onVerifyIdentity('https://www.google.com');

    const interval = setInterval(async () => {
      // const res = await checkVerification();
      // if (res.verified) {
      //   await store.dispatch(currentIdentities());
      //   clearInterval(interval);
      // }
    }, 5000);

    setTimeout(() => {
      clearInterval(interval);
    }, 120000);
  };

  return {
    data: { type, verified, hideVerifyBanner, pendingOrgVerification },
    operations: { onDismiss, onVerifyIdentity, getConnectUrl },
  };
};

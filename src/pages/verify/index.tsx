import KYB from 'src/modules/Verification/containers/KYB';
import KYC from 'src/modules/Verification/containers/KYC';

import { useVerify } from './useVerify';

export const Verify = () => {
  const {
    data: { type, openVerifyModal },
    operations: { onCloseVerifyModal },
  } = useVerify();

  if (type === 'users') {
    return <KYC open={openVerifyModal} handleClose={onCloseVerifyModal} connectUrl="www.google.com" />;
  } else {
    return <KYB open={openVerifyModal} setOpen={onCloseVerifyModal} />;
  }
};

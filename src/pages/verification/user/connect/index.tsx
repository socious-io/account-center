import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Header from 'src/modules/Layout/containers/Header';
import KYC from 'src/modules/Verification/containers/KYC';

import styles from './index.module.scss';
import { useConnect } from './useConnect';

export const Connect = () => {
  const {
    data: { verifyStatus, connectURL },
  } = useConnect();

  return (
    <div className={styles['container']}>
      <Header title={translate('verification-kyc.title')} subtitle={translate('verification-kyc.subtitle')} />
      <Divider />
      <KYC connectUrl={connectURL} status={verifyStatus} />
    </div>
  );
};

import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Header from 'src/modules/Layout/containers/Header';
import KYC from 'src/modules/Verification/containers/KYC';

import styles from './index.module.scss';

export const Connect = () => {
  return (
    <div className={styles['container']}>
      <Header title={translate('verification-kyc.title')} subtitle={translate('verification-kyc.subtitle')} />
      <Divider />
      <KYC />
    </div>
  );
};

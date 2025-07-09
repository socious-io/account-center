import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Header from 'src/modules/Layout/containers/Header';
import KYB from 'src/modules/Verification/containers/KYB';

import styles from './index.module.scss';

export const OrgVerify = () => {
  return (
    <div className={styles['container']}>
      <Header title={translate('verification-kyb.title')} subtitle={translate('verification-kyb.subtitle')} />
      <Divider />
      <KYB />
    </div>
  );
};

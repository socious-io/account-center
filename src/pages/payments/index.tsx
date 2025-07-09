import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Header from 'src/modules/Layout/containers/Header';
import PaymentMethods from 'src/modules/Payments/containers/PaymentMethods';

import styles from './index.module.scss';

export const Payments = () => {
  return (
    <div className={styles['container']}>
      <Header title={translate('payments-title')} subtitle={translate('payments-subtitle')} />
      <Divider />
      <PaymentMethods />
    </div>
  );
};

import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Header from 'src/modules/Layout/containers/Header';
import ManagePassword from 'src/modules/Profile/containers/ManagePassword';

import styles from './index.module.scss';

export const Password = () => {
  return (
    <div className={styles['container']}>
      <Header title={translate('password-title')} subtitle={translate('password-subtitle')} />
      <Divider />
      <ManagePassword />
    </div>
  );
};

import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import ManageProfile from 'src/modules/Profile/ManageProfile';

import styles from './index.module.scss';

export const Profile = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>{translate('profile-title')}</h1>
        <h2 className={styles['header__subtitle']}>{translate('profile-subtitle')}</h2>
      </div>
      <Divider />
      <ManageProfile />
    </div>
  );
};

import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Header from 'src/modules/Layout/containers/Header';
import ManageProfile from 'src/modules/Profile/containers/ManageProfile';

import styles from './index.module.scss';

export const Profile = () => {
  return (
    <div className={styles['container']}>
      <Header title={translate('profile-title')} subtitle={translate('profile-subtitle')} />
      <Divider />
      <ManageProfile />
    </div>
  );
};

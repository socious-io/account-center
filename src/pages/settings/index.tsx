import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Header from 'src/modules/Layout/containers/Header';
import ManageSettings from 'src/modules/Settings/containers/ManageSettings';

import styles from './index.module.scss';

export const Settings = () => {
  return (
    <div className={styles['container']}>
      <Header title={translate('settings-title')} subtitle={translate('settings-subtitle')} />
      <Divider />
      <ManageSettings />
    </div>
  );
};

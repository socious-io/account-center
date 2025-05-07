import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import ManageSettings from 'src/modules/Settings/containers/ManageSettings';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';

export const Settings = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles['container']}>
      <BackLink title="Back" customStyle={styles['back']} onBack={() => dispatch(showMenu())} />
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>{translate('settings-title')}</h1>
        <h2 className={styles['header__subtitle']}>{translate('settings-subtitle')}</h2>
      </div>
      <Divider />
      <ManageSettings />
    </div>
  );
};

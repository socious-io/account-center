import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import ManagePassword from 'src/modules/Profile/containers/ManagePassword';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';

export const Password = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles['container']}>
      <BackLink customStyle={styles['back']} onBack={() => dispatch(showMenu())} />
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>{translate('password-title')}</h1>
        <h2 className={styles['header__subtitle']}>{translate('password-subtitle')}</h2>
      </div>
      <Divider />
      <ManagePassword />
    </div>
  );
};

import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import BackLink from 'src/modules/General/components/BackLink';
import ManagePassword from 'src/modules/Profile/ManagePassword';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';

export const Password = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles['container']}>
      <BackLink title="Back" customStyle={styles['back']} onBack={() => dispatch(showMenu())} />
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>Password</h1>
        <h2 className={styles['header__subtitle']}>Please enter your current password to change your password.</h2>
      </div>
      <Divider />
      <ManagePassword />
    </div>
  );
};

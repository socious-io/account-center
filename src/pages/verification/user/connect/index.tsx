import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import KYC from 'src/modules/Verification/containers/KYC';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';
import { useConnect } from './useConnect';

export const Connect = () => {
  const {
    data: { verifyStatus, connectURL },
    operations: { dispatch },
  } = useConnect();

  return (
    <div className={styles['container']}>
      <BackLink title="Back" customStyle={styles['back']} onBack={() => dispatch(showMenu())} />
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>{translate('verification-kyc.title')}</h1>
        <h2 className={styles['header__subtitle']}>{translate('verification-kyc.subtitle')}</h2>
      </div>
      <Divider />
      <KYC connectUrl={connectURL} status={verifyStatus} />
    </div>
  );
};

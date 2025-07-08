import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import Link from 'src/modules/General/components/Link';
import MyReferral from 'src/modules/Refer/containers/MyReferral';
import ReferOverview from 'src/modules/Refer/containers/ReferOverview';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';

export const Refer = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles['container']}>
      <BackLink customStyle={styles['back']} onBack={() => dispatch(showMenu())} />
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>{translate('refer-header')}</h1>
        <h2 className={styles['header__subtitle']}>{translate('refer-subheader')}</h2>
      </div>
      <Divider />
      <div className="flex flex-col">
        <span className="text-base font-normal leading-6 text-Gray-light-mode-600">{translate('refer-desc')}</span>
        <Link
          label={translate('refer-learn-more-link')}
          href="https://socious.gitbook.io/whitepaper/socio-tokens/how-to-get-socio"
          target="_blank"
          customStyle="w-fit !text-base !leading-6"
        />
      </div>
      <ReferOverview />
      <MyReferral />
    </div>
  );
};

import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Link from 'src/modules/General/components/Link';
import Header from 'src/modules/Layout/containers/Header';
import MyReferral from 'src/modules/Refer/containers/MyReferral';
import ReferOverview from 'src/modules/Refer/containers/ReferOverview';

import styles from './index.module.scss';

export const Refer = () => {
  return (
    <div className={styles['container']}>
      <Header title={translate('refer-title')} subtitle={translate('refer-subtitle')} />
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

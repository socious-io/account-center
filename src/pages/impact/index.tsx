import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import Details from 'src/modules/Impact/Details';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';

export const Impact = () => {
  const dispatch = useDispatch();
  const tabs = [];
  return (
    <div className={styles['container']}>
      <BackLink title="Back" customStyle={styles['back']} onBack={() => dispatch(showMenu())} />
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>{translate('impact-title')}</h1>
        <h2 className={styles['header__subtitle']}>{translate('impact-subtitle')}</h2>
      </div>
      <Details />
      <HorizontalTabs tabs={tabs} leftAligned={false} containerCustomStyle="!gap-0" />
    </div>
  );
};

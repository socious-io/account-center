import { useDispatch } from 'react-redux';
import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import Details from 'src/modules/Impact/containers/Details';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';

export const Impact = () => {
  const dispatch = useDispatch();
  const tabs = [
    {
      label: translate('impact-tab1'),
      content: <></>,
    },
    {
      label: translate('impact-tab2'),
      content: <></>,
    },
    {
      label: translate('impact-tab3'),
      content: <></>,
    },
  ];

  return (
    <div className={styles['container']}>
      <BackLink title="Back" customStyle={styles['back']} onBack={() => dispatch(showMenu())} />
      <div className={styles['header']}>
        <h1 className={styles['header__title']}>{translate('impact-title')}</h1>
        <h2 className={styles['header__subtitle']}>{translate('impact-subtitle')}</h2>
      </div>
      <div>
        <Details />
        <div className={styles['table']}>
          <HorizontalTabs
            tabs={tabs}
            leftAligned={false}
            containerCustomStyle={styles['table__container']}
            tabsCustomStyle={styles['table__tabs']}
            contentCustomStyle={styles['table__content']}
          />
        </div>
      </div>
    </div>
  );
};

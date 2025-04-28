import { useDispatch } from 'react-redux';
import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import AchievementsList from 'src/modules/Impact/containers/AchievementsList';
import ContributionsList from 'src/modules/Impact/containers/ContributionsList';
import Details from 'src/modules/Impact/containers/Details';
import VotesList from 'src/modules/Impact/containers/VotesList';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';

export const Impact = () => {
  const dispatch = useDispatch();
  const tabs = [
    {
      label: translate('impact-contributions.tab'),
      content: <ContributionsList />,
    },
    {
      label: translate('impact-votes.tab'),
      content: <VotesList />,
    },
    {
      label: translate('impact-achievements.tab'),
      content: <AchievementsList />,
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

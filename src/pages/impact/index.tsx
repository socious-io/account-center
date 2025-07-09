import { translate } from 'src/core/helpers/utils';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import AchievementsList from 'src/modules/Impact/containers/AchievementsList';
import ContributionsList from 'src/modules/Impact/containers/ContributionsList';
import Details from 'src/modules/Impact/containers/Details';
import VotesList from 'src/modules/Impact/containers/VotesList';
import Header from 'src/modules/Layout/containers/Header';

import styles from './index.module.scss';

export const Impact = () => {
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
      <Header title={translate('impact-title')} subtitle={translate('impact-subtitle')} className="px-4 md:px-8" />
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

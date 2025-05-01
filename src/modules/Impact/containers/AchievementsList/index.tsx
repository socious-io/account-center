import { translate } from 'src/core/helpers/utils';
import AchievementCard from 'src/modules/Impact/components/AchievementCard';

import styles from './index.module.scss';
import { useAchievementsList } from './useAchievementsList';

const AchievementsList = () => {
  const {
    data: { currentIdentityImpactPoints, tier, unlockedList, inProgressList },
  } = useAchievementsList();

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <span className={styles['title--bold']}>{translate('impact-achievements.unlocked-title')}</span>
        {translate('impact-achievements.unlocked-subtitle')}
      </div>
      <div className={styles['list']}>
        <AchievementCard
          label={`Tier ${tier}`}
          tier={tier}
          point={currentIdentityImpactPoints}
          className={styles['card']}
        />
        {unlockedList.map(list => (
          <AchievementCard {...list} key={list.key} className={styles['card']} />
        ))}
      </div>
      <div className={styles['title']}>
        <span className={styles['title--bold']}>{translate('impact-achievements.progress-title')}</span>
        {translate('impact-achievements.progress-subtitle')}
      </div>
      <div className={styles['list']}>
        {inProgressList.map(list => (
          <AchievementCard {...list} key={list.key} className={styles['card']} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;

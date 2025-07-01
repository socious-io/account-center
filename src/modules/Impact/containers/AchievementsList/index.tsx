import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import AchievementCard from 'src/modules/Impact/components/AchievementCard';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useAchievementsList } from './useAchievementsList';
import ClaimBadgeModal from '../ClaimBadgeModal';

const AchievementsList = () => {
  const {
    data: {
      currentIdentityImpactPoints,
      tier,
      unlockedList,
      inProgressList,
      hasUnclaimedBadges,
      openClaimModal,
      connectUrl,
    },
    operations: { onClaimClick, setOpenClaimModal },
  } = useAchievementsList();

  return (
    <>
      <div className={styles['container']}>
        <Button
          color="primary"
          startIcon={<Icon name="shield-tick" fontSize={20} color={variables.color_white} />}
          onClick={onClaimClick}
          disabled={!hasUnclaimedBadges}
          customStyle="w-fit self-center"
        >
          {translate('impact-achievements.claim-badge.button')}
        </Button>
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
      <ClaimBadgeModal open={openClaimModal} handleClose={() => setOpenClaimModal('')} connectUrl={connectUrl} />
    </>
  );
};

export default AchievementsList;

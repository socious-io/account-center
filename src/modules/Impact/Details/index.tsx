import Avatar from 'src/modules/General/components/Avatar';
import AvatarGroup from 'src/modules/General/components/avatarGroup';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import ProgressBar from 'src/modules/General/components/LinearProgressbar';

import styles from './index.module.scss';
import useDetails from './useDetails';
const Details = () => {
  const {
    data: { impactData, isExpanded },
    operations: { handleToggle },
  } = useDetails();

  const renderStats = (
    <div className={styles['stats-card']}>
      <div className={styles['stats-card__item']}>
        <span className={styles['stats-card__value']}>{impactData.stats.hoursContributed}</span>
        <span className={styles['stats-card__label']}>Hours </span>
        <span className={styles['stats-card__label']}>contributed </span>
      </div>
      {!isExpanded && (
        <>
          <div className={styles['stats-card__item']}>
            <span className={styles['stats-card__value']}>{impactData.stats.hoursWorked}</span>
            <span className={styles['stats-card__label']}>Hours </span>
            <span className={styles['stats-card__label']}>worked</span>
          </div>
          <div className={styles['stats-card__item']}>
            <span className={styles['stats-card__value']}>{impactData.stats.projectsSupported}</span>
            <span className={styles['stats-card__label']}>Projects </span>
            <span className={styles['stats-card__label']}>supported</span>
          </div>
          <div className={styles['stats-card__item']}>
            <span className={styles['stats-card__value']}>${impactData.stats.totalDonated}</span>
            <span className={styles['stats-card__label']}>Total</span>
            <span className={styles['stats-card__label']}>donated</span>
          </div>
        </>
      )}
      <Button variant="text" color="secondary" onClick={handleToggle} customStyle="block md:hidden">
        {isExpanded ? 'See Less' : 'See More'}
      </Button>
    </div>
  );

  return (
    <div className={styles['container']}>
      <div className={styles['container__inner']}>
        <Avatar type="users" size="100px" tier={impactData.points.tier} hasBorder />
        <span className={styles['points']}></span>
        <Button
          startIcon={<Icon name="star-06" />}
          variant="outlined"
          color="secondary"
          customStyle={styles['perks-button']}
        >
          See my perks
        </Button>
        <AvatarGroup accounts={impactData.accounts} length={3} />
        <ProgressBar value={impactData.points.value} />
      </div>
      {renderStats}
    </div>
  );
};

export default Details;

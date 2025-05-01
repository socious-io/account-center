import { translate } from 'src/core/helpers/utils';
import Avatar from 'src/modules/General/components/Avatar';
import AvatarGroup from 'src/modules/General/components/AvatarGroup';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import ProgressBar from 'src/modules/General/components/LinearProgressbar';

import styles from './index.module.scss';
import useDetails from './useDetails';

const Details = () => {
  const {
    data: {
      impact,
      currentIdentityProfile,
      currentIdentityImpactPoints,
      tier,
      pointsLeft,
      progressPercent,
      isExpanded,
    },
    operations: { handleToggle },
  } = useDetails();

  const stats = [
    {
      value: impact.stats.hoursContributed,
      label1: translate('impact-details.hours'),
      label2: translate('impact-details.contributed'),
      alwaysShow: true,
    },
    {
      value: impact.stats.hoursWorked,
      label1: translate('impact-details.hours'),
      label2: translate('impact-details.worked'),
    },
    {
      value: impact.stats.hoursVolunteered,
      label1: translate('impact-details.hours'),
      label2: translate('impact-details.volunteered'),
    },
    {
      value: impact.stats.projectsSupported,
      label1: translate('impact-details.projects'),
      label2: translate('impact-details.supported'),
    },
    {
      value: `$${impact.stats.totalDonated.toLocaleString()}`,
      label1: translate('impact-details.total'),
      label2: translate('impact-details.donated'),
    },
  ];

  const renderStats = (
    <div className={`${styles['stats']} ${isExpanded && styles['stats--expanded']}`}>
      {stats
        .filter(stat => stat.alwaysShow || isExpanded)
        .map((stat, index) => (
          <div key={index} className={styles['stats__item']}>
            <span className={styles['stats__value']}>{stat.value}</span>
            <span className={styles['stats__label']}>
              {stat.label1} <br className="hidden md:block" />
              {stat.label2}
            </span>
          </div>
        ))}
      <Button variant="text" color="primary" onClick={handleToggle} customStyle="!h-auto !py-0 block md:hidden">
        {translate(`impact-details.see-${isExpanded ? 'less' : 'more'}-btn`)}
      </Button>
    </div>
  );

  return (
    <div className={styles['container']}>
      <div className={styles['impact']}>
        <div className={styles['impact__inner']}>
          <Avatar img={currentIdentityProfile} type="users" size="100px" tier={tier} hasBorder />
          <div className={styles['impact__points']}>
            <span className={styles['impact__points--bold']}>{currentIdentityImpactPoints?.toLocaleString()}</span>
            {translate('impact-details.points')}
          </div>
          <ProgressBar
            value={progressPercent || 0}
            description={translate('impact-details.next-tier', { count: pointsLeft })}
            containerClassName="w-full"
          />
          <AvatarGroup
            accounts={[
              { id: '2', image: '/images/achievements/zero-hunger.svg' },
              { id: '3', image: '/images/achievements/health.svg' },
              { id: '4', image: '/images/achievements/education-quality.svg' },
            ]}
            tier={tier}
            visibleCount={3}
            showMore
            size="40px"
          />
          <Button
            startIcon={<Icon name="star-06" />}
            variant="outlined"
            color="info"
            customStyle={styles['impact__perk']}
          >
            {translate('impact-details.see-my-perk')}
          </Button>
        </div>
      </div>
      {renderStats}
    </div>
  );
};

export default Details;

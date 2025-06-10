import { beautifyText } from 'src/core/helpers/texts';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useReferOverview } from './useReferOverview';

const ReferOverview = () => {
  const {
    data: { achievements, totalRewards, unclaimedRewards, totalReferrals, isClaimedExpanded, isUnclaimedExpanded },
    operations: { handleClaimClick, handleToggleSeeMore },
  } = useReferOverview();

  return (
    <div className={styles['container']}>
      {!!achievements.length && (
        <div className={styles['overview']}>
          {isClaimedExpanded && (
            <div className={styles['overview__item']}>
              <b className={styles['overview__item--bold']}>{totalReferrals}</b>
              {translate('refer-overview.referrals')}
            </div>
          )}
          {achievements
            .filter(() => isClaimedExpanded)
            .map(achievement => (
              <div key={achievement.type} className={styles['overview__item']}>
                <b className={styles['overview__item--bold']}>{achievement.total}</b>
                {beautifyText(achievement.type)}
              </div>
            ))}
          <div className={styles['overview__item']}>
            <b className={styles['overview__item--bold']}>
              {totalRewards.toLocaleString()} {'THANK'}
            </b>
            {translate('refer-overview.total-rewards')}
          </div>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleToggleSeeMore('claimed')}
            customStyle="self-center !h-auto !py-0 block md:hidden"
          >
            {translate(`refer-overview.see-${isClaimedExpanded ? 'less' : 'more'}-btn`)}
          </Button>
        </div>
      )}
      <div className={styles['unclaimed']}>
        <strong className={styles['unclaimed--bold']}>
          {unclaimedRewards.toLocaleString()} {'THANK'}
        </strong>
        {translate('refer-overview.unclaimed-rewards', { no: !unclaimedRewards && 'no' })}
      </div>
      {isUnclaimedExpanded && (
        <>
          <div className={styles['description']}>
            {totalReferrals ? (
              <>
                <p className={styles['description__text']}>{translate('refer-overview.track-referral')}</p>
                <div className={styles['description--claimed']}>
                  <Icon
                    name="tick"
                    fontSize={12}
                    color={variables.color_success_700}
                    className={styles['description__icon']}
                  />
                  {translate('refer-overview.claimed-color')}
                </div>
                <div className={styles['description--unclaimed']}>
                  <Icon
                    name="alert-circle"
                    fontSize={12}
                    color={variables.color_error_600}
                    className={styles['description__icon']}
                  />
                  {translate('refer-overview.unclaimed-color')}
                </div>
                <p className={styles['description__text']}>{translate('refer-overview.share-code-continue')}</p>
              </>
            ) : (
              <>
                <p className={styles['description__text']}>{translate('refer-overview.no-active-referral')}</p>
                <p className={styles['description__text']}>{translate('refer-overview.share-code-start')}</p>
              </>
            )}
          </div>
          <Button
            color="primary"
            customStyle="w-full md:w-fit self-center"
            onClick={handleClaimClick}
            disabled={!unclaimedRewards}
          >
            {translate('refer-overview.claim-now-btn')}
          </Button>
        </>
      )}
      <Button
        variant="text"
        color="primary"
        onClick={() => handleToggleSeeMore('unclaimed')}
        customStyle="self-center !h-auto !py-0 block md:hidden"
      >
        {translate(`refer-overview.see-${isUnclaimedExpanded ? 'less' : 'more'}-btn`)}
      </Button>
    </div>
  );
};

export default ReferOverview;

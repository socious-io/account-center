import { getReferOverview, getReferrals } from 'src/core/api';

import { AdaptorRes, ClaimedAchievement, getCurrentIdentityAdaptor, MyReferralRes, ReferOverviews } from '..';

export const getReferAdaptor = async (): Promise<AdaptorRes<ReferOverviews>> => {
  try {
    const {
      total_per_achievement_type = [],
      total_reward_amount,
      total_unclaimed_reward_amount,
      total_count,
    } = await getReferOverview();
    const achievements = total_per_achievement_type.map(achievement => ({
      type: achievement.achievement_type,
      total: achievement.total_count,
    }));
    const totalRewards = total_reward_amount || 0;
    const unclaimedRewards = total_unclaimed_reward_amount || 0;
    const totalReferrals = total_count || 0;
    const data = { achievements, totalRewards, unclaimedRewards, totalReferrals };

    return { data, error: null };
  } catch (error) {
    console.error('Error in getting Refer Overview', error);
    return { data: null, error: 'Error in getting Refer Overview' };
  }
};

export const getMyReferralAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<MyReferralRes>> => {
  try {
    const { results: referrals, total_count: total } = await getReferrals();
    const results = referrals.map(referral => {
      const achievements = referral.achievements.reduce(
        (acc, { type, ...rest }) => {
          acc[type] = {
            claimed: !!rest.reward_claimed_at,
            //FIXME: BE need
            did: true,
          };
          return acc;
        },
        {} as Record<string, ClaimedAchievement>,
      );

      const { name, email, img } = getCurrentIdentityAdaptor(referral.referee);
      return {
        identity: {
          name,
          username: email || '',
          img,
        },
        date: referral.referee.created_at,
        ...achievements,
      };
    });

    return {
      data: {
        results,
        page,
        limit,
        total,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting My Referrals', error);
    return { data: null, error: 'Error in getting My Referrals' };
  }
};

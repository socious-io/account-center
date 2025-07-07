import { getBadges, getImpactOverview, getImpactPoints } from 'src/core/api';
import { getBadgeLevel } from 'src/core/helpers/getBadgeLevel';

import { AchievementsRes, AdaptorRes, ContributionsRes, ContributionType, Impact, VotesRes, VoteType } from '..';

export const getImpactAdaptor = async (): Promise<AdaptorRes<Impact>> => {
  try {
    const { total_per_type: overviews } = await getImpactOverview();
    const getOverviewValue = (type: string) => overviews.find(overview => overview.type === type)?.total_values || 0;
    const hoursWorked = getOverviewValue('WORKSUBMIT');
    const hoursVolunteered = getOverviewValue('VOLUNTEER');
    const totalDonated = getOverviewValue('DONATION');
    const data = {
      stats: {
        hoursContributed: hoursWorked + hoursVolunteered,
        hoursWorked,
        hoursVolunteered,
        // projectsSupported: 24,
        totalDonated,
      },
    };

    return { data, error: null };
  } catch (error) {
    console.error('Error in getting Impact Points Overview', error);
    return { data: null, error: 'Error in getting Impact Points Overview' };
  }
};

export const getContributionsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<ContributionsRes>> => {
  try {
    const { impact_points: contributions } = await getImpactPoints({
      page,
      limit,
      type: 'WORKSUBMIT,VOLUNTEER,SERVICE',
    });
    const results = contributions.map(contribution => {
      const user = contribution.user;
      return {
        id: contribution.id,
        identity: {
          name: `${user.first_name} ${user.last_name}`,
          username: user.username,
          img: user.avatar?.url || '',
        },
        date: contribution.created_at,
        type: (contribution.type === 'SERVICE' ? 'Service' : 'Job') as ContributionType,
        points: contribution.total_points,
      };
    });

    return {
      data: {
        results,
        total: 2,
        limit,
        page,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting Contributions List', error);
    return { data: null, error: 'Error in getting Contributions List' };
  }
};

export const getVotesAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<VotesRes>> => {
  try {
    const { impact_points: votes } = await getImpactPoints({ page, limit, type: 'DONATION' });
    const results = votes.map(vote => {
      const user = vote.user;
      return {
        id: vote.id,
        donated_identity: { name: `${user.first_name} ${user.last_name}` },
        date: vote.created_at,
        type: 'donate' as VoteType,
        currency: vote.meta?.donation.currency,
        donated_price: vote.meta?.donation.amount,
      };
    });

    return {
      data: {
        results,
        total: 2,
        limit,
        page,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting Votes List', error);
    return { data: null, error: 'Error in getting Votes List' };
  }
};

export const getAchievementsAdaptor = async (): Promise<AdaptorRes<AchievementsRes>> => {
  try {
    const { badges } = await getBadges();
    const data = badges.map(badge => ({
      name: badge.social_cause_category,
      level: getBadgeLevel(badge.total_points),
      claimed: badge.is_claimed,
    }));

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting Achievements List', error);
    return { data: null, error: 'Error in getting Achievements List' };
  }
};

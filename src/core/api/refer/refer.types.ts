import { Identity } from '../identity/identity.types';
import { PaginateRes } from '../types';

export type ReferOverview = {
  achievement_type: string;
  total_count: number;
};

export interface ReferOverviewsRes {
  total_count: number;
  total_reward_amount: number;
  total_unclaimed_reward_amount: number;
  total_per_achievement_type: ReferOverview[];
}

export type ClaimedAchievement = {
  type: string;
  reward_claimed_at: Date | null;
  did?: boolean;
};

export interface MyReferral {
  referee: Identity;
  achievements: ClaimedAchievement[];
}

export interface MyReferralRes extends PaginateRes {
  results: MyReferral[];
}

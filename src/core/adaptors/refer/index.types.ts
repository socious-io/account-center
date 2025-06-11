import { PaginateRes } from '..';

export type ReferAchievement = {
  //FIXME: add some fixed types according to BE
  type: string;
  total: number;
};

export interface ReferOverviews {
  achievements: ReferAchievement[];
  totalRewards: number;
  unclaimedRewards: number;
  totalReferrals: number;
}

export type ClaimedAchievement = {
  claimed: boolean;
  done?: boolean;
};

export interface Referral {
  identity: {
    name: string;
    username: string;
    img?: string;
  };
  date: Date;
  [achievement: string]: ClaimedAchievement | any;
}

export type MyReferralRes = PaginateRes<Referral>;

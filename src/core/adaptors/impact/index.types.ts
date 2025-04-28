import { PaginateRes } from '..';

export type ContributionType = 'Job' | 'Service';

export type VoteType = 'donate' | 'vote';

export interface Impact {
  accounts: any[];
  stats: {
    hoursContributed: number;
    hoursWorked: number;
    hoursVolunteered: number;
    projectsSupported: number;
    totalDonated: number;
  };
  points: {
    value: number;
    tier: number;
  };
}

export interface Contribution {
  id: string;
  //FIXME: fix any later
  identity: any;
  date: Date;
  type: ContributionType;
  points: number;
}

export type ContributionsRes = PaginateRes<Contribution>;

export interface Vote {
  id: string;
  //FIXME: fix any later
  donated_identity: any;
  date: Date;
  type: VoteType;
  donated_price?: number;
  currency?: string;
  converted_value?: number;
}

export type VotesRes = PaginateRes<Vote>;

export interface Achievement {
  name: string;
  level: number;
}

export type AchievementsRes = Achievement[];

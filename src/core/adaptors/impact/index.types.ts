import { PaginateRes } from '..';

export type ContributionType = 'Job' | 'Service';

export type VoteType = 'donate' | 'vote';

export interface Impact {
  stats: {
    hoursContributed: number;
    hoursWorked: number;
    hoursVolunteered: number;
    projectsSupported?: number;
    totalDonated: number;
  };
}

export interface Contribution {
  id: string;
  identity: {
    name: string;
    username: string;
    img?: string;
  };
  date: Date;
  type: ContributionType;
  points: number;
}

export type ContributionsRes = PaginateRes<Contribution>;

export interface Vote {
  id: string;
  donated_identity: { name: string };
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
  claimed?: boolean;
}

export type AchievementsRes = Achievement[];

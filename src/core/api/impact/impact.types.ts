import { User } from '..';
import { PaginateRes } from '../types';

export type ImpactPointType = 'WORKSUBMIT' | 'VOLUNTEER' | 'SERVICE' | 'DONATION' | 'OTHER';

export interface ImpactPoint {
  id: string;
  total_points: number;
  user: User;
  social_cause: string;
  social_cause_category: string;
  type: ImpactPointType;
  meta: { donation: { amount: number; currency: string } } | null;
  created_at: Date;
}

export interface ImpactPointsRes extends PaginateRes {
  impact_points: ImpactPoint[];
}

export interface ImpactPointOverview {
  total_points: number;
  total_values: number;
  type: ImpactPointType;
}

export type ImpactPointOverviewRes = {
  total_per_type: ImpactPointOverview[];
};

export interface Badge {
  total_points: number;
  count: number;
  social_cause_category: string;
  is_claimed: boolean;
}

export type BadgesRes = {
  badges: Badge[];
};

import { get } from '../http';
import { MyReferralRes, ReferOverviewsRes } from './refer.types';

export async function getReferOverview(): Promise<ReferOverviewsRes> {
  return (await get<ReferOverviewsRes>('/referrals/stats')).data;
}

export async function getReferrals(): Promise<MyReferralRes> {
  return (await get<MyReferralRes>('/referrals')).data;
}

import { get } from '../http';
import { PaginateReq } from '../types';
import { MyReferralRes, ReferOverviewsRes } from './refer.types';

export async function getReferOverview(): Promise<ReferOverviewsRes> {
  return (await get<ReferOverviewsRes>('/referrals/stats')).data;
}

export async function getReferrals(params?: PaginateReq): Promise<MyReferralRes> {
  return (await get<MyReferralRes>('/referrals', { params })).data;
}

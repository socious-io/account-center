import { get } from '../http';
import { FilterReq } from '../types';
import { BadgesRes, ImpactPointOverviewRes, ImpactPointsRes } from './impact.types';

export async function getImpactOverview(): Promise<ImpactPointOverviewRes> {
  return (await get<ImpactPointOverviewRes>('impact-points/stats')).data;
}

export async function getImpactPoints(payload?: FilterReq): Promise<ImpactPointsRes> {
  return (await get<ImpactPointsRes>('impact-points', {}, payload)).data;
}

export async function getBadges(): Promise<BadgesRes> {
  return (await get<BadgesRes>('impact-points/badges')).data;
}

import { KYBReq, KYBRes, KYCRes } from './verification.types';
import { get, post } from '../http';

export async function requestKYB(id: string, payload: KYBReq): Promise<KYBRes> {
  return (await post<KYBRes>(`kybs/${id}`, payload)).data;
}

export async function getKYB(id: string): Promise<KYBRes> {
  return (await get<KYBRes>(`kybs/${id}`)).data;
}

export async function requestKYC(): Promise<KYCRes> {
  return (await post<KYCRes>('verifications', {})).data;
}

export async function getKYC(): Promise<KYCRes> {
  return (await get<KYCRes>('verifications')).data;
}

export async function getConnection(id: string): Promise<KYCRes> {
  return (await get<KYCRes>(`/verifications/${id}/connect`)).data;
}

import { KYBReq, KYBRes, KYCRes } from './verification.types';
import { get, post } from '../http';

export async function requestKYB(id: string, payload: KYBReq): Promise<KYBRes> {
  return (await post<KYBRes>(`kyb/${id}`, payload)).data;
}

export async function getKYB(id: string): Promise<KYBRes> {
  return (await get<KYBRes>(`kyb/${id}`)).data;
}

export async function requestKYC(): Promise<KYCRes> {
  return (await post<KYCRes>('/kyc', {})).data;
}

export async function getKYC(): Promise<KYCRes> {
  return (await get<KYCRes>('kyc', {})).data;
}

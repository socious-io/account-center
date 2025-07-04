import { KYBReq, KYBRes } from './verification.types';
import { get, post } from '../http';

export async function requestKYB(id: string, payload: KYBReq): Promise<KYBRes> {
  return (await post<KYBRes>(`kybs/${id}`, payload)).data;
}

export async function getKYB(id: string): Promise<KYBRes> {
  return (await get<KYBRes>(`kybs/${id}`)).data;
}

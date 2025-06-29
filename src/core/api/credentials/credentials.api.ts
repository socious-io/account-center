import { get, post } from '../http';
import { CredentialRes, CredentialType } from './credentials.types';

export async function requestCredential(type: CredentialType): Promise<CredentialRes> {
  return (await post<CredentialRes>('credentials', { type })).data;
}

export async function getCredential(type: CredentialType): Promise<CredentialRes> {
  return (await get<CredentialRes>(`credentials?type=${type}`)).data;
}

export async function getConnection(id: string): Promise<CredentialRes> {
  return (await get<CredentialRes>(`credentials/${id}/connect`)).data;
}

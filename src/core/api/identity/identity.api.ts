import { get } from '../http';
import { IdentityRes } from './identity.types';

export async function identities(): Promise<IdentityRes[]> {
  return (await get<IdentityRes[]>('identities')).data;
}

import { UserReq, User } from './users.types';
import { get, put } from '../http';

export async function getUser(): Promise<User> {
  return (await get<User>('users')).data;
}

export async function updateProfile(payload: UserReq): Promise<User> {
  return (await put<User>('users', payload)).data;
}

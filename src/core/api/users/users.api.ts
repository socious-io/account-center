import { UserReq, User, ForgetPasswordReq } from './users.types';
import { get, put } from '../http';
import { SuccessRes } from '../types';

export async function getUser(): Promise<User> {
  return (await get<User>('users')).data;
}

export async function updateProfile(payload: UserReq): Promise<User> {
  return (await put<User>('users', payload)).data;
}

export async function updatePassword(payload: ForgetPasswordReq): Promise<SuccessRes> {
  return (await put<SuccessRes>('auth/password', payload)).data;
}

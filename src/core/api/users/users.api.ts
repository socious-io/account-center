import { UserReq, User, StripeLinkRes, StripeProfileRes, ForgetPasswordReq, StripeLinkReq } from './users.types';
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

export async function getStripeLink(params: StripeLinkReq): Promise<StripeLinkRes> {
  return (await get<StripeLinkRes>('auth/stripe/connect-link', { params })).data;
}

export async function getUserStripeProfile(): Promise<StripeProfileRes> {
  return (await get<StripeProfileRes>('auth/stripe/profile')).data;
}

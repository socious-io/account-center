import { getUser, updatePassword, updateProfile, UserType } from 'src/core/api';

import { AdaptorRes, CustomError, SuccessRes } from '..';
import { UserReq, User, PasswordReq } from './index.types';

export const getUserProfileAdaptor = async (): Promise<AdaptorRes<User>> => {
  try {
    const user = await getUser();
    const res: User = {
      id: user.id,
      avatar: { url: user.avatar?.url || '', id: user.avatar_id },
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      email: user.email,
      type: 'users' as UserType,
      verified: !!user.identity_verified_at,
      impactPoints: user.impact_points,
    };
    return { data: res, error: null };
  } catch (error: any) {
    console.error('Error in getting User Profile', error);
    const status = error?.response?.status || error?.status || 500;
    if (status === 401) {
      throw { message: 'Unauthorized - login required', status };
    }
    return { data: null, error: 'Error in getting User Profile' };
  }
};

export const changeUserProfileAdaptor = async (payload: UserReq): Promise<AdaptorRes<User>> => {
  try {
    const newPayload = {
      avatar_id: payload?.avatarId || '',
      first_name: payload.firstName,
      last_name: payload.lastName,
      username: payload.username,
      email: payload.email,
    };
    const user = await updateProfile(newPayload);
    const res = {
      id: user.id,
      avatar: { url: user.avatar?.url || '', id: user.avatar_id || '' },
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      email: user.email,
      type: 'users' as UserType,
      verified: !!user.identity_verified_at,
      impactPoints: user.impact_points,
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in changing User Profile', error);
    return { data: null, error: 'Error in changing User Profile' };
  }
};

export const changePasswordAdaptor = async (payload: PasswordReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const newPayload = {
      current_password: payload.currentPass,
      password: payload.confirmPass,
    };
    await updatePassword(newPayload);
    return { data: { message: 'succeed' }, error: null };
  } catch (error: unknown) {
    console.error('Error in changing Password', error);
    return { data: null, error: (error as CustomError).response.data.error || 'Error in changing Password' };
  }
};

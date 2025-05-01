import { getUser, updateProfile, UserType } from 'src/core/api';

import { AdaptorRes } from '..';
import { UserReq, User } from './index.types';

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
  } catch (error) {
    console.error('Error in getting User Profile', error);
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

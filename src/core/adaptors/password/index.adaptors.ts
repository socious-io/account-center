import { updatePassword } from 'src/core/api';

import { AdaptorRes, SuccessRes, CustomError } from '..';
import { PasswordReq } from './index.types';

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

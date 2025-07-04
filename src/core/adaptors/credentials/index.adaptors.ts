import { getConnection, requestCredential } from 'src/core/api';

import { AdaptorRes } from '..';
import { Credential } from './index.types';

export const createCredentialsAdaptor = async (): Promise<AdaptorRes<Credential>> => {
  try {
    const res = await requestCredential('BADGES');
    return {
      error: null,
      data: { id: res.id, connectURL: res.connection_url },
    };
  } catch {
    return {
      error: 'Error in creating credentials API call',
      data: null,
    };
  }
};

export const getCredentialsConnectionAdaptor = async (verifyId: string): Promise<AdaptorRes<Credential>> => {
  try {
    const res = await getConnection(verifyId);
    return {
      error: null,
      data: { id: res.id, connectURL: res.connection_url },
    };
  } catch {
    return {
      error: 'Error in getting credentials connection API call',
      data: null,
    };
  }
};

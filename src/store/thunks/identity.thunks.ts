import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIdentitiesAdaptor } from 'src/core/adaptors';

export const currentIdentities = createAsyncThunk('identity/currentIdentities', async () => {
  const { error, data: currentIdentities } = await getIdentitiesAdaptor();
  if (error) throw error;
  return currentIdentities;
});

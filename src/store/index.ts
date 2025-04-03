import { configureStore } from '@reduxjs/toolkit';

import { identitySlice } from './reducers/identity.reducer';
import { languageSlice } from './reducers/language.reducer';
import { loadingSlice } from './reducers/loading.reducer';

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    language: languageSlice.reducer,
    identity: identitySlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modals/openModal'],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

import { configureStore } from '@reduxjs/toolkit';

import { identitySlice } from './reducers/identity.reducer';
import { loadingSlice } from './reducers/loading.reducer';
import { menuSlice } from './reducers/menu.reducer';

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    identity: identitySlice.reducer,
    menu: menuSlice.reducer,
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

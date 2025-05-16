import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';
import { WagmiProvider } from 'wagmi';

import { setupInterceptors } from './core/api';
import { config } from './core/wallet/config';
import RequestLoading from './modules/General/components/RequestLoading';
import store from './store';
import { currentIdentities } from './store/thunks/identity.thunks';
import 'src/core/translation/i18n';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    setupInterceptors(store);
    store.dispatch(currentIdentities());
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router.routes} />
              <RequestLoading />
            </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;

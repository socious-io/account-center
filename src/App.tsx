import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';
import { WagmiProvider } from 'wagmi';

import { RTL_LANGUAGES } from './constants/LANGUAGES';
import { setupInterceptors } from './core/api';
import { wagmiConfig } from './core/dapp/config';
import RequestLoading from './modules/General/components/RequestLoading';
import store from './store';
import { WalletProvider } from './store/contexts';
import { currentIdentities } from './store/thunks/identity.thunks';
import 'src/core/translation/i18n';

const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    const direction = RTL_LANGUAGES.includes(currentLang) ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  useEffect(() => {
    setupInterceptors(store);
    store.dispatch(currentIdentities());
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <WalletProvider>
            <WagmiProvider config={wagmiConfig}>
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={router.routes} />
                <RequestLoading />
              </QueryClientProvider>
            </WagmiProvider>
          </WalletProvider>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;

import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';

import { RTL_LANGUAGES } from './constants/LANGUAGES';
import { setupInterceptors } from './core/api';
import RequestLoading from './modules/General/components/RequestLoading';
import store from './store';
import { currentIdentities } from './store/thunks/identity.thunks';
import 'src/core/translation/i18n';

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
          <RouterProvider router={router.routes} />
          <RequestLoading />
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;

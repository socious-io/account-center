import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';

import { config } from './config';
import { setupInterceptors } from './core/api';
import RequestLoading from './modules/General/components/RequestLoading';
import store from './store';
import { currentIdentities } from './store/thunks/identity.thunks';
import 'src/core/translation/i18n';

function App() {
  useEffect(() => {
    setupInterceptors(store);
    store.dispatch(currentIdentities());
  }, []);

  console.log(config.basePath);

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

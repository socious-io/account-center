import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';

import App from './App';
import './styles/main.scss';
import { translate } from './core/helpers/utils';
import { FallBack } from './pages/error/fallback';
import { logError } from './pages/error/fallback/index.services';

const VERSION = '1.0.0';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="version" content={VERSION} />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <title>{translate('layout.brand-full')}</title>
    </Helmet>
    <ErrorBoundary fallback={<FallBack />} onError={logError}>
      <App />
    </ErrorBoundary>
  </>,
);
defineCustomElements(window);

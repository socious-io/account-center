import { useSelector } from 'react-redux';
import { Navigate, Outlet, RouteObject, createBrowserRouter, useLocation, useRouteError } from 'react-router-dom';
import { config } from 'src/config';
import Layout from 'src/modules/Layout';
import { NotFound } from 'src/pages/error/NotFound';
import { FallBack } from 'src/pages/fallback';
import { RootState } from 'src/store';

import { checkVerificationAdaptor, getAchievementsAdaptor } from '../adaptors';
import { getContributionsAdaptor, getImpactAdaptor, getVotesAdaptor } from '../adaptors';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  {
    element: <GlobalStatusGuard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: 'profile',
            async lazy() {
              const { Profile } = await import('src/pages/profile');
              return { Component: Profile };
            },
          },
          {
            path: 'password',
            async lazy() {
              const { Password } = await import('src/pages/password');
              return { Component: Password };
            },
          },
          {
            path: 'verification',
            children: [
              {
                path: '',
                loader: async () => {
                  const { data } = await checkVerificationAdaptor();
                  return { verifyId: data?.id || '' };
                },
                async lazy() {
                  const { Verification } = await import('src/pages/verification/user');
                  return {
                    Component: Verification,
                  };
                },
              },
              {
                path: 'connect/:id',
                async lazy() {
                  const { Connect } = await import('src/pages/verification/user/connect');
                  return { Component: Connect };
                },
              },
            ],
          },
          {
            path: 'impact',
            loader: async () => {
              const [impact, contributions, votes, achievements] = await Promise.all([
                getImpactAdaptor(),
                getContributionsAdaptor(),
                getVotesAdaptor(),
                getAchievementsAdaptor(),
              ]);
              return {
                impact: impact.data,
                contributionsList: contributions.data,
                votesList: votes.data,
                achievementsList: achievements.data,
              };
            },
            async lazy() {
              const { Impact } = await import('src/pages/impact');
              return { Component: Impact };
            },
          },
          {
            path: 'settings',
            async lazy() {
              const { Settings } = await import('src/pages/settings');
              return { Component: Settings };
            },
          },
        ],
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  { path: '*', element: <NotFound /> },
];

function DefaultRoute() {
  const { search } = useLocation();
  return <Navigate to={`/profile${search}`} replace />;
}

function GlobalStatusGuard() {
  const status = useSelector((state: RootState) => state.identity.status);

  if (status === 'succeed') return <Navigate to="/profile" />;
  if (status === 'loading') return <div></div>;
  if (status === 'failed') {
    window.location.href = config.baseURL + '/auth/login';
    return null;
  }

  return <Outlet />;
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) {
    window.location.href = config.baseURL + '/auth/login';
    return null;
  }
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint, {
  basename: config.basePath,
});

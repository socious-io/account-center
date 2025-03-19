import { useSelector } from 'react-redux';
import { Navigate, Outlet, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import Layout from 'src/modules/Layout';
import { FallBack } from 'src/pages/fallback';
import { RootState } from 'src/store';

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
            path: 'verify',
            async lazy() {
              const { Verify } = await import('src/pages/verify');
              return { Component: Verify };
            },
          },
        ],
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  { path: '*', element: <div>Page not found :(</div> },
];

function GlobalStatusGuard() {
  const status = useSelector((state: RootState) => state.identity.status);

  if (status === 'loading') return <div></div>;
  if (status === 'failed') return <Navigate to="/intro" />;

  return <Outlet />;
}

function DefaultRoute() {
  const status = useSelector((state: RootState) => state.identity.status);

  if (status === 'succeeded') return <Navigate to="/profile" />;
  if (status === 'loading') return <div></div>;
  if (status === 'failed') return <Navigate to="/intro" />;

  return <Navigate to="/profile" />;
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) return <Navigate to="/sign-in" />;
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint);

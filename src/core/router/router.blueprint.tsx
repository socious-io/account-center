import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import Base from 'src/modules/Base';
import Layout from 'src/modules/Layout';
import { FallBack } from 'src/pages/fallback';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  {
    element: <Base isAuthRoute={false} />,
    loader: async () => {
      const authenticated = await isAuthenticated();
      return authenticated;
    },
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: 'profile',
            async lazy() {
              const { Profile } = await import('src/pages/profile');
              return {
                Component: Profile,
              };
            },
          },
        ],
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    element: <Base isAuthRoute={true} />,
    loader: async () => {
      const authenticated = await isAuthenticated();
      return authenticated;
    },
    children: [],
    errorElement: <ErrorBoundary />,
  },
  {
    path: '*',
    element: <div>Page not found :(</div>,
  },
];

function DefaultRoute() {
  return <Navigate to="/profile" />;
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) return <Navigate to="/sign-in" />;
  return <FallBack />;
}

const isAuthenticated = async () => {
  return true;
};

export const routes = createBrowserRouter(blueprint);

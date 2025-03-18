import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

import { BaseProps } from './index.types';

const Base: React.FC<BaseProps> = ({ isAuthRoute }) => {
  const authenticated = useLoaderData();

  if (authenticated) {
    return isAuthRoute ? <Navigate to="/" /> : <Outlet />;
  }

  return isAuthRoute ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default Base;

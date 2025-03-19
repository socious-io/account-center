import { Outlet } from 'react-router-dom';

import HamburgerMenu from './containers/HamburgerMenu';
import VerifyTopBanner from './containers/VerifyTopBanner';
import css from './index.module.scss';

const Layout = () => {
  return (
    <div className={css['container']}>
      <HamburgerMenu />
      <div className={css['content']}>
        <VerifyTopBanner />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

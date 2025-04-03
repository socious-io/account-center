import { Outlet } from 'react-router-dom';

import HamburgerMenu from './containers/HamburgerMenu';
import VerifyTopBanner from './containers/VerifyTopBanner';
import styles from './index.module.scss';

const Layout = () => {
  return (
    <div className={styles['container']}>
      <HamburgerMenu />
      <div className={styles['content']}>
        <VerifyTopBanner />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

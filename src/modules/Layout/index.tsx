import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from 'src/store';
import { hideMenu } from 'src/store/reducers/menu.reducer';

import HamburgerMenu from './containers/HamburgerMenu';
// import VerifyTopBanner from './containers/VerifyTopBanner';
import styles from './index.module.scss';

const Layout = () => {
  const menuIsOpened = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    if (isMobile) {
      dispatch(hideMenu());
    }
  };

  return (
    <div className={styles['container']}>
      <HamburgerMenu animatable menuIsOpened={menuIsOpened} onCloseMenu={handleCloseMenu} />
      <div className={styles['content']}>
        {/* <VerifyTopBanner /> */}
        <div className={styles['header']}>Socious ID</div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

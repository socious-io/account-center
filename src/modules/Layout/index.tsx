import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RTL_LANGUAGES } from 'src/constants/LANGUAGES';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';
import { hideMenu } from 'src/store/reducers/menu.reducer';

import HamburgerMenu from './containers/HamburgerMenu';
// import VerifyTopBanner from './containers/VerifyTopBanner';
import styles from './index.module.scss';

const Layout = () => {
  const menuIsOpened = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch();
  const language = localStorage.getItem('i18nextLng') || 'en';
  const isRTL = RTL_LANGUAGES.includes(language);

  const handleCloseMenu = () => {
    if (isMobile) {
      dispatch(hideMenu());
    }
  };

  return (
    <div className={styles['container']}>
      <HamburgerMenu animatable isRTL={isRTL} menuIsOpened={menuIsOpened} onCloseMenu={handleCloseMenu} />
      <div className={`${styles['content']} ${isRTL && styles['content--rtl']}`}>
        {/* <VerifyTopBanner /> */}
        <div className={styles['header']}>{translate('layout.brand')}</div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import { useDispatch } from 'react-redux';
import BackLink from 'src/modules/General/components/BackLink';
import NavPortal from 'src/modules/Layout/components/NavPortal';
import { showMenu } from 'src/store/reducers/menu.reducer';

import styles from './index.module.scss';
import { HeaderProps } from './index.types';

const Header: React.FC<HeaderProps> = ({ title, subtitle, className = '' }) => {
  const dispatch = useDispatch();

  return (
    <div className={`${styles['container']} ${className}`}>
      <div className={styles['left']}>
        <BackLink customStyle={styles['back']} onBack={() => dispatch(showMenu())} />
        <div className={styles['header']}>
          <h1 className={styles['header__title']}>{title}</h1>
          <h2 className={styles['header__subtitle']}>{subtitle}</h2>
        </div>
      </div>
      <div className={styles['right']}>
        <NavPortal />
      </div>
    </div>
  );
};

export default Header;

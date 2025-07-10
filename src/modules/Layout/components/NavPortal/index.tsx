import { useRef, useState } from 'react';
import fundLogo from 'src/assets/logo/fund-logo.svg';
import workLogo from 'src/assets/logo/socious-logo.svg';
import verifyLogo from 'src/assets/logo/verify-logo.svg';
import { config } from 'src/config';
import useDetectOutside from 'src/core/hooks/detectOutside';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';

const NavPortal = () => {
  const [openNav, setOpenNav] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useDetectOutside(navRef, () => setOpenNav(false));

  const products = [
    {
      name: 'Work',
      logo: workLogo,
      link: config.workURL,
    },
    {
      name: 'Verify',
      logo: verifyLogo,
      link: config.verifyURL,
    },
    {
      name: 'Fund',
      logo: fundLogo,
      link: config.fundURL,
    },
  ];

  return (
    <div ref={navRef} className="relative">
      <Icon
        name="dots-grid"
        fontSize={28}
        color={variables.color_primary_600}
        cursor="pointer"
        containerClass={`${styles['icon']} ${openNav && styles['icon--open']}`}
        onClick={e => {
          e?.preventDefault();
          setOpenNav(!openNav);
        }}
      />
      <div className={`${styles['menu']} ${!openNav && styles['menu--hide']} `}>
        {products.map(product => (
          <div key={product.name} className={styles['product']} onClick={() => (window.location.href = product.link)}>
            <div className={styles['product__img']}>
              <img src={product.logo} alt={`Socious ${product.name}`} width={24} height={24} />
            </div>
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavPortal;

import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import { AvatarDropDown } from 'src/modules/General/containers/AvatarDropdown';
import LinkItem from 'src/modules/Layout/components/LinkItem';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { HamburgerMenuProps } from './index.types';
import { useHamburgerMenu } from './useHamburgerMenu';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ animatable = false, menuIsOpened = false, onCloseMenu }) => {
  const {
    data: { translate, currentIdentityType, selectedItem },
    operations: { handleNavigate, onLogout },
  } = useHamburgerMenu();

  const menuItems = [
    { id: 'profile', iconName: 'user-circle', title: 'Account profile', path: '/profile' },
    ...(currentIdentityType === 'users'
      ? [
          { id: 'password', iconName: 'passcode', title: 'Password', path: '/password' },
          { id: 'verification', iconName: 'shield-tick', title: 'Verification', path: '/verification' },
          { id: 'impact', iconName: 'heart-circle', title: 'My impact', path: '/impact' },
        ]
      : [{ id: 'kyb', iconName: 'shield-tick', title: 'KYB', path: '/verify' }]),
    // { id: 'payments', iconName: 'credit-card-02', title: 'Payments', path: '/payments' },
    // { id: 'staking', iconName: 'line-chart-up-03', title: 'Staking', path: '/staking' },
  ];

  return (
    <div className={`${styles['container']} ${animatable && !menuIsOpened && styles['container--closed']}`}>
      <div className={styles['container__top']}>
        <div className={styles['header']}>{translate('layout.brand')}</div>
        <span className={styles['subheader']}>{translate('layout.bio')}</span>
        <AvatarDropDown displayOtherAccounts onCreateAccount={() => console.log('create account')} />
        <div className={styles['menu']}>
          {menuItems.map(item => (
            <LinkItem
              key={item.id}
              {...item}
              onClick={() => {
                handleNavigate(item.id, item.path);
                onCloseMenu?.();
              }}
              isSelected={selectedItem.includes(item.id)}
            />
          ))}
        </div>
      </div>
      <Button
        color="inherit"
        variant="text"
        customStyle={styles['container__bottom']}
        startIcon={<Icon name="log-out-01" fontSize={24} color={variables.color_grey_600} cursor="pointer" />}
        onClick={onLogout}
      >
        {translate('layout.log-out-btn')}
      </Button>
    </div>
  );
};

export default HamburgerMenu;

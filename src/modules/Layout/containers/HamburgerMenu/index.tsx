import Icon from 'src/modules/General/components/Icon';
import { AvatarDropDown } from 'src/modules/General/containers/AvatarDropdown';
import LinkItem from 'src/modules/Layout/components/LinkItem';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { HamburgerMenuProps } from './index.types';
import { useHamburgerMenu } from './useHamburgerMenu';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ animatable = false, menuIsOpened = false, onCloseMenu }) => {
  const {
    data: { translate, type, selectedItem },
    operations: { handleNavigate, onLogout },
  } = useHamburgerMenu();

  const menuItems = [
    { id: 'profile', iconName: 'user-circle', title: 'Account profile', path: '/profile' },
    ...(type === 'users'
      ? [
          { id: 'password', iconName: 'passcode', title: 'Password', path: '/password' },
          { id: 'verification', iconName: 'shield-tick', title: 'Verification', path: '/verification' },
          { id: 'impact', iconName: 'heart-circle', title: 'My impact', path: '/impact' },
        ]
      : [{ id: 'kyb', iconName: 'shield-tick', title: 'KYB', path: '/verify' }]),
    { id: 'payments', iconName: 'credit-card-02', title: 'Payments', path: '/payments' },
    { id: 'staking', iconName: 'line-chart-up-03', title: 'Staking', path: '/staking' },
  ];

  return (
    <div className={`${css['container']} ${animatable && !menuIsOpened && css['container--closed']}`}>
      <div className={css['container__top']}>
        <div className={css['header']}>Socious ID</div>
        <span className={css['subheader']}>Manage your account across your Socious ecosystem</span>
        <AvatarDropDown displayOtherAccounts onCreateAccount={() => console.log('create account')} />
        <div className={css['menu']}>
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
      <div className={css['container__bottom']}>
        <Icon name="log-out-01" fontSize={24} color={variables.color_grey_600} cursor="pointer" />
        Log out
      </div>
    </div>
  );
};

export default HamburgerMenu;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { CurrentIdentity } from 'src/core/adaptors';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';

export const useHamburgerMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.replace('/', '');
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const currentIdentityType = currentIdentity?.type;
  const [selectedItem, setSelectedItem] = useState(path || 'credentials');

  useEffect(() => {
    setSelectedItem(pathname.replace('/', ''));
  }, [pathname]);

  const handleNavigate = (selected: string, path: string) => {
    if (pathname.includes(path)) {
      return;
    } else {
      setSelectedItem(selected);
      navigate(path);
    }
  };

  const onCreateAccount = () => {
    currentIdentityType === 'users'
      ? (window.location.href = config.baseURL + '/organizations/register/pre')
      : onLogout();
  };

  const onLogout = async () => {
    await nonPermanentStorage.clear();
    window.location.href = config.baseURL + '/auth/logout';
  };

  return {
    data: {
      currentIdentityType,
      selectedItem,
    },
    operations: {
      handleNavigate,
      onCreateAccount,
      onLogout,
    },
  };
};

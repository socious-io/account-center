import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/adaptors';
import { cleanAuthParams } from 'src/core/api/auth/auth.service';
import { RootState } from 'src/store';

export const useHamburgerMenu = () => {
  const { t: translate } = useTranslation();
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

  const onLogout = () => {
    cleanAuthParams();
    // dispatch(clearUserProfile());
    // dispatch(clearOrgProfile());
    navigate('/sign-in');
  };

  return {
    data: {
      translate,
      currentIdentityType,
      selectedItem,
    },
    operations: {
      handleNavigate,
      onLogout,
    },
  };
};

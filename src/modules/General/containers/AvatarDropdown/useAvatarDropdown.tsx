import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIdentitiesAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useAvatarDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accounts = useSelector((state: RootState) => state.identity.entities);
  const [open, setOpen] = useState(false);
  const selectedAccount = accounts.find(account => account.current);
  const otherAccounts = accounts.filter(account => !account.current);

  const handleAvatarClick = () => setOpen(!open);

  const switchAccount = async (accountId: string) => {
    const { error, data } = await getIdentitiesAdaptor(accountId);
    if (error) return;
    else if (data) {
      dispatch(setIdentityList(data));
      navigate('/');
      setOpen(false);
    }
  };

  return { switchAccount, open, handleAvatarClick, accountList: accounts, selectedAccount, otherAccounts };
};

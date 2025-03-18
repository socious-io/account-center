import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIdentitiesAdaptor, CurrentIdentity } from 'src/core/adaptors';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useAvatarDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const identities = useSelector((state: RootState) => state.identity.entities);
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<CurrentIdentity[]>([]);
  const selectedAccount = accounts.find(account => account.current);
  const otherAccounts = accounts.filter(account => !account.current);

  useEffect(() => {
    !!identities.length && setAccounts(identities);
  }, [identities.length]);

  const handleAvatarClick = () => setOpen(!open);

  const switchAccount = async (accountId: string) => {
    await nonPermanentStorage.set({ key: 'identity', value: accountId });
    const { error, data } = await getIdentitiesAdaptor();
    if (error) return;
    else if (data) {
      dispatch(setIdentityList(data));
      navigate('/');
      setOpen(false);
    }
  };

  return { switchAccount, open, handleAvatarClick, accountList: accounts, selectedAccount, otherAccounts };
};

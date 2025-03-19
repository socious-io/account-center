import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useVerify = () => {
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const type = currentIdentity?.type;
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  useEffect(() => {
    setOpenVerifyModal(true);
  }, [openVerifyModal, type]);

  const onCloseVerifyModal = () => {
    setOpenVerifyModal(false);
    navigate('/');
  };

  return { data: { type, openVerifyModal }, operations: { onCloseVerifyModal } };
};

import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { createVerificationAdaptor } from 'src/core/adaptors';

export const useKYC = (connectUrl: string) => {
  const navigate = useNavigate();
  const [openQRModal, setOpenQRModal] = useState(false);

  const onVerify = () => {
    if (isMobile) {
      const newTab = window.open(connectUrl, '_blank');
      newTab?.focus();
    } else {
      setOpenQRModal(true);
    }
  };

  const onCreateVerification = async () => {
    const { error, data } = await createVerificationAdaptor();
    if (error) return;
    if (data) navigate('/verification');
  };

  return {
    data: {
      openQRModal,
    },
    operations: {
      setOpenQRModal,
      onVerify,
      onCreateVerification,
    },
  };
};

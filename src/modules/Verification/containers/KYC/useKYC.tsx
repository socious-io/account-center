import { useState } from 'react';
import { isMobile } from 'react-device-detect';

export const useKYC = (connectUrl: string) => {
  const [openQRModal, setOpenQRModal] = useState(false);

  const onVerify = () => {
    if (isMobile) {
      const newTab = window.open(connectUrl, '_blank');
      newTab?.focus();
    } else {
      setOpenQRModal(true);
    }
  };

  return {
    data: {
      openQRModal,
    },
    operations: {
      setOpenQRModal,
      onVerify,
    },
  };
};

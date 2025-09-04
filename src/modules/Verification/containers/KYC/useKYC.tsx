import { useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createVerificationAdaptor,
  CurrentIdentity,
  getVerificationConnectionAdaptor,
  verifyActionAdaptor,
  KYC,
  KYCStatus,
} from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useKYC = () => {
  const { id: connectId } = useParams();
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const verified = currentIdentity?.verified;
  const [openQRModal, setOpenQRModal] = useState(false);
  const [data, setData] = useState<KYC>();
  const [verifyStatus, setVerifyStatus] = useState<KYCStatus>(verified ? 'succeed' : 'inactive');
  const EXPIRED_QR_CODE = 120_000;

  const getConnectData = useCallback(async () => {
    if (!connectId) return;
    const { error, data } = await getVerificationConnectionAdaptor(connectId);
    if (error) return;
    if (data) setData(data);
  }, [connectId]);

  useEffect(() => {
    if (verified || !openQRModal) return;
    else {
      getConnectData();
      const interval = setInterval(getConnectData, EXPIRED_QR_CODE);
      return () => clearInterval(interval);
    }
  }, [verified, openQRModal, getConnectData]);

  useEffect(() => {
    if (verified) return;
    const controller = new AbortController();

    const getStatus = async () => {
      const res = await verifyActionAdaptor(controller.signal);
      setVerifyStatus(res);
    };
    getStatus();

    return () => {
      controller.abort();
    };
  }, [verified]);

  const onVerify = () => {
    if (isMobile) {
      const newTab = window.open(data?.connectURL, '_blank');
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
      connectUrl: data?.connectURL || '',
      status: verifyStatus,
    },
    operations: {
      setOpenQRModal,
      onVerify,
      onCreateVerification,
    },
  };
};

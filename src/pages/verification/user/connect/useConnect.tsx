import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CurrentIdentity,
  getVerificationConnectionAdaptor,
  KYC,
  KYCStatus,
  verifyActionAdaptor,
} from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useConnect = () => {
  const { id: connectId } = useParams();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const verified = currentIdentity?.verified;
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
    if (verified) return;
    getConnectData();
    const interval = setInterval(getConnectData, EXPIRED_QR_CODE);
    return () => clearInterval(interval);
  }, [verified, getConnectData]);

  useEffect(() => {
    if (verified) return;
    const controller = new AbortController();

    const getStatus = async () => {
      if (data?.id) {
        const res = await verifyActionAdaptor(controller.signal);
        setVerifyStatus(res);
      }
    };
    getStatus();

    return () => {
      controller.abort();
    };
  }, [verified, data]);

  return {
    data: {
      verifyStatus,
      connectURL: data?.connectURL || '',
    },
  };
};

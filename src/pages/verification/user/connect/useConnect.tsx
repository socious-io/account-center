import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getConnectionAdaptor, KYC, KYCStatus, verifyActionAdaptor } from 'src/core/adaptors';

export const useConnect = () => {
  const dispatch = useDispatch();
  const { id: connectId } = useParams();
  const [data, setData] = useState<KYC>();
  const [verifyStatus, setVerifyStatus] = useState<KYCStatus>('');
  const EXPIRED_QR_CODE = 120_000;

  const getConnectData = useCallback(async () => {
    if (!connectId) return;
    const { error, data } = await getConnectionAdaptor(connectId);
    if (error) return;
    if (data) setData(data);
  }, [connectId]);

  useEffect(() => {
    getConnectData();
    const interval = setInterval(getConnectData, EXPIRED_QR_CODE);
    return () => clearInterval(interval);
  }, [getConnectData]);

  useEffect(() => {
    const getStatus = async () => {
      if (data?.id) {
        const res = await verifyActionAdaptor();
        setVerifyStatus(res);
      }
    };
    getStatus();
  }, [data]);

  return { data: { verifyStatus, connectURL: data?.connectURL || '' }, operations: { dispatch } };
};

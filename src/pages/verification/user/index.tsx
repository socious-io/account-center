import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { createVerificationAdaptor } from 'src/core/adaptors';

export const Verification = () => {
  const { verifyId } = useLoaderData() as { verifyId: string };
  const navigate = useNavigate();

  useEffect(() => {
    if (verifyId) {
      navigate(`/verification/connect/${verifyId}`);
    } else {
      const fetchVerificationId = async () => {
        const { error, data } = await createVerificationAdaptor();
        if (error || !data?.id) return;
        if (data) navigate(`/verification/connect/${data.id}`);
      };

      fetchVerificationId();
    }
  }, [verifyId, navigate]);

  return null;
};

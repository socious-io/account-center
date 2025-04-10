import { getConnection, getKYC, requestKYB, requestKYC } from 'src/core/api';

import { AdaptorRes, KYC, KYCStatus, SuccessRes } from '..';

export const verifyOrganizationAdaptor = async (
  orgId: string,
  documents: string[],
): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await requestKYB(orgId, { documents });
    return { data: { message: 'succeed' }, error: null };
  } catch {
    return { data: null, error: 'Error in verifying organization API call' };
  }
};

export const createVerificationAdaptor = async (): Promise<AdaptorRes<KYC>> => {
  try {
    const res = await requestKYC();
    return {
      error: null,
      data: { id: res.id, connectURL: res.connection_url, status: res.status },
    };
  } catch {
    return {
      error: 'Error in checking verification API call',
      data: null,
    };
  }
};

export const checkVerificationAdaptor = async (): Promise<AdaptorRes<KYC>> => {
  try {
    const res = await getKYC();
    return {
      error: null,
      data: { id: res.id, connectURL: res.connection_url, status: res.status },
    };
  } catch {
    return {
      error: 'Error in checking verification API call',
      data: null,
    };
  }
};

export const verifyActionAdaptor = async (): Promise<KYCStatus> => {
  let checkedStatus: KYCStatus = '';
  const checkStatus = async (): Promise<KYCStatus> => {
    const { data } = await checkVerificationAdaptor();
    if (data) {
      const status = data.status;
      switch (status) {
        case 'REQUESTED':
        case 'CREATED':
          return new Promise(resolve => {
            setTimeout(async () => {
              resolve(await checkStatus()); // Re-check after 5 seconds
            }, 5000);
          });
        case 'VERIFIED':
          checkedStatus = 'succeed';
          return checkedStatus;
        case 'FAILED':
          checkedStatus = 'failed';
          return checkedStatus;
        default:
          throw new Error('Unknown status received');
      }
    } else {
      throw new Error('No data received from verification');
    }
  };

  return await checkStatus();
};

export const getConnectionAdaptor = async (verifyId: string): Promise<AdaptorRes<KYC>> => {
  try {
    const res = await getConnection(verifyId);
    return {
      error: null,
      data: { id: res.id, connectURL: res.connection_url, status: res.status },
    };
  } catch {
    return {
      error: 'Error in checking verification API call',
      data: null,
    };
  }
};

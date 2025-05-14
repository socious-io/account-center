import { getConnection, getKYC, requestKYB, requestKYC } from 'src/core/api';

import { AdaptorRes, KYB, KYC, KYCStatus } from '..';

export const verifyOrganizationAdaptor = async (orgId: string, documents: string[]): Promise<AdaptorRes<KYB>> => {
  try {
    const data = await requestKYB(orgId, { documents });
    return { data: { status: data.status }, error: null };
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
      //FIXME: BE change string to object with type of error
      data: { id: res.id, connectURL: res.connection_url, status: res.status, validationError: res.validation_error },
    };
  } catch {
    return {
      error: 'Error in checking verification API call',
      data: null,
    };
  }
};

export const verifyActionAdaptor = async (signal?: AbortSignal): Promise<KYCStatus> => {
  let checkedStatus: KYCStatus = '';
  const checkStatus = async (): Promise<KYCStatus> => {
    const { data } = await checkVerificationAdaptor();
    if (data) {
      const status = data.status;
      //FIXME: BE change string to object with type of error
      const duplicateError = data?.validationError;
      switch (status) {
        case 'REQUESTED':
        case 'CREATED':
          return new Promise((resolve, reject) => {
            const timeout = setTimeout(async () => {
              try {
                resolve(await checkStatus());
              } catch (err) {
                reject(err);
              }
            }, 5000);
            signal?.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new Error('Polling aborted'));
            });
          });
        case 'VERIFIED':
          checkedStatus = 'succeed';
          return checkedStatus;
        case 'FAILED':
          checkedStatus = duplicateError ? 'exceeded' : 'failed';
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

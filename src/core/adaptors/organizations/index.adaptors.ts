import { getOrg, getOrgs, updateOrg, UserType } from 'src/core/api';

import { AdaptorRes, OrgReq, Org, SuccessRes } from '..';

export const getOrgsAdaptor = async (): Promise<AdaptorRes<Org[]>> => {
  try {
    const { results = [] } = await getOrgs();
    const data = results.map(result => ({
      id: result.id,
      logo: { url: result.logo?.url || '', id: result.logo_id },
      name: result.name,
      username: result.username,
      email: result.email,
      isVerified: result.is_verified,
      verificationStatus: result.verification_status,
      type: 'organizations' as UserType,
    }));
    return { data, error: null };
  } catch (error) {
    console.error('Error in getting all Organizations', error);
    return { data: null, error: 'Error in getting all Organizations' };
  }
};

export const getOrgProfileAdaptor = async (orgId: string): Promise<AdaptorRes<Org>> => {
  try {
    const org = await getOrg(orgId);
    const res: Org = {
      id: orgId,
      logo: { url: org.logo?.url || '', id: org.logo_id || '' },
      name: org.name,
      username: org.username,
      email: org.email,
      isVerified: org?.is_verified,
      verificationStatus: org.verification_status,
      type: 'organizations' as UserType,
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in getting Organization Profile', error);
    return { data: null, error: 'Error in getting Organization Profile' };
  }
};

export const changeOrgProfileAdaptor = async (orgId: string, payload: OrgReq): Promise<AdaptorRes<SuccessRes>> => {
  try {
    const newPayload = {
      logo_id: payload?.logoId || '',
      name: payload.name,
      username: payload.username,
      email: payload.email,
    };
    await updateOrg(orgId, newPayload);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in changing Organization Profile', error);
    return { data: null, error: 'Error in changing Organization Profile' };
  }
};

export const getOrgIdAdaptor = async (): Promise<AdaptorRes<string>> => {
  try {
    const { results = [] } = await getOrgs();
    return { data: results && results.length ? results[0]?.id || '' : '', error: null };
  } catch (error) {
    console.error('Error in getting Organization ID', error);
    return { data: null, error: 'Error in getting Organization ID' };
  }
};

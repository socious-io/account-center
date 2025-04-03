import { getMineOrgs, getOrg, updateOrg, UserType } from 'src/core/api';

import { AdaptorRes, OrgReq, Org } from '..';

export const getOrgsAdaptor = async (): Promise<AdaptorRes<Org[]>> => {
  try {
    const results = await getMineOrgs();
    const data = results.map(result => ({
      id: result.id,
      logo: { url: result.logo?.url || '', id: result.logo_id },
      name: result.name,
      username: result.shortname,
      email: result.email,
      verified: result.verified,
      verificationStatus: result.status,
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
      username: org.shortname,
      email: org.email,
      verified: org.verified,
      verificationStatus: org.status,
      type: 'organizations' as UserType,
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in getting Organization Profile', error);
    return { data: null, error: 'Error in getting Organization Profile' };
  }
};

export const changeOrgProfileAdaptor = async (orgId: string, payload: OrgReq): Promise<AdaptorRes<Org>> => {
  try {
    const newPayload = {
      logo_id: payload?.logoId || '',
      name: payload.name,
      shortname: payload.username,
      email: payload.email,
    };
    const org = await updateOrg(orgId, newPayload);
    const res = {
      id: orgId,
      logo: { url: org.logo?.url || '', id: org.logo_id || '' },
      name: org.name,
      username: org.shortname,
      email: org.email,
      verified: org.verified,
      verificationStatus: org.status,
      type: 'organizations' as UserType,
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in changing Organization Profile', error);
    return { data: null, error: 'Error in changing Organization Profile' };
  }
};

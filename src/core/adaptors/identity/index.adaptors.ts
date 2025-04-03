import { nonPermanentStorage } from 'src/core/storage/non-permanent';

import { AdaptorRes, getOrgsAdaptor, getUserProfileAdaptor, CurrentIdentity, Org, User } from '..';

export const getIdentitiesAdaptor = async (): Promise<AdaptorRes<CurrentIdentity[]>> => {
  try {
    const currentIdentityId = await nonPermanentStorage.get('identity');

    let identities: (User | Org)[] = [];
    const { data: userData } = await getUserProfileAdaptor();
    if (userData) identities = [userData as User];

    const { data: orgsData } = await getOrgsAdaptor();
    if (orgsData) identities = [...identities, ...(orgsData as Org[])];

    const data = identities.map((identity, index) => ({
      id: identity.id,
      firstName: identity.type === 'users' ? (identity as User).firstName : null,
      lastName: identity.type === 'users' ? (identity as User).lastName : null,
      name:
        identity.type === 'users'
          ? `${(identity as User).firstName} ${(identity as User).lastName}`
          : (identity as Org).name,
      img: identity.type === 'users' ? (identity as User).avatar?.url : (identity as Org).logo?.url,
      imgId: identity.type === 'users' ? (identity as User).avatar?.id : (identity as Org).logo?.id,
      type: identity.type || 'users',
      username: identity.username || '',
      email: identity.email,
      current: currentIdentityId ? identity.id === currentIdentityId : index === 0,
      verified: identity.verified,
      verificationStatus: identity.type === 'organizations' ? (identity as Org).verificationStatus : null,
    }));
    return { data, error: null };
  } catch {
    return { data: null, error: 'Error is Identity API call' };
  }
};

export const getCurrentIdentityAdaptor = (identity: CurrentIdentity | User | Org) => {
  const currentIdentity = {
    id: identity.id,
    firstName: identity.type === 'users' ? (identity as User).firstName : null,
    lastName: identity.type === 'users' ? (identity as User).lastName : null,
    name:
      identity.type === 'users'
        ? `${(identity as User).firstName} ${(identity as User).lastName}`
        : (identity as Org).name,
    img: identity.type === 'users' ? (identity as User).avatar?.url : (identity as Org).logo?.url,
    imgId: identity.type === 'users' ? (identity as User).avatar?.id : (identity as Org).logo?.id,
    type: identity.type || 'users',
    username: identity.username || '',
    email: identity.email,
    verified: identity.verified,
    verificationStatus: identity.type === 'organizations' ? (identity as Org).verificationStatus : null,
  };

  return currentIdentity;
};

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

export const getCurrentIdentityAdaptor = (identity: CurrentIdentity | User | Org | undefined) => {
  if (!identity) {
    return {
      id: '',
      firstName: '',
      lastName: '',
      name: '',
      img: '',
      imgId: '',
      type: '',
      username: '',
      email: '',
      verified: false,
      verificationStatus: null,
    };
  }
  // CurrentIdentity type
  if ('img' in identity) {
    return {
      id: identity.id,
      firstName: (identity as CurrentIdentity).firstName,
      lastName: (identity as CurrentIdentity).lastName,
      name: (identity as CurrentIdentity).name,
      img: (identity as CurrentIdentity).img,
      imgId: (identity as CurrentIdentity).imgId,
      type: identity.type || 'users',
      username: identity.username || '',
      email: identity.email,
      verified: identity.verified,
      verificationStatus: identity.verificationStatus,
    };
  } else {
    // User or Org type
    const isUser = identity.type === 'users';
    const user = identity as User;
    const org = identity as Org;

    return {
      id: identity.id,
      firstName: isUser ? user.firstName : null,
      lastName: isUser ? user.lastName : null,
      name: isUser ? `${user.firstName} ${user.lastName}` : org.name,
      img: isUser ? user.avatar?.url : org.logo?.url,
      imgId: isUser ? user.avatar?.id : org.logo?.id,
      type: identity.type || 'users',
      username: identity.username || '',
      email: identity.email,
      verified: identity.verified,
      verificationStatus: identity.type === 'organizations' ? (identity as Org).verificationStatus : null,
    };
  }
};

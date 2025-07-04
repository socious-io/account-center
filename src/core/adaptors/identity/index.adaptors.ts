import { User as UserRes, Organization as OrgRes, Identity } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

import { AdaptorRes, getOrgsAdaptor, getUserProfileAdaptor, CurrentIdentity, Org, User } from '..';

export const getIdentitiesAdaptor = async (identityId?: string): Promise<AdaptorRes<CurrentIdentity[]>> => {
  try {
    const storageIdentityId = await nonPermanentStorage.get('identity');
    const currentIdentityId = identityId || storageIdentityId;

    let identities: (User | Org)[] = [];
    const { data: userData } = await getUserProfileAdaptor();
    if (userData) identities = [userData as User];

    const { data: orgsData } = await getOrgsAdaptor();
    if (orgsData) identities = [...identities, ...(orgsData as Org[])];

    const data = identities.map((identity, index) => {
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
        current: currentIdentityId ? identity.id === currentIdentityId : index === 0,
        verified: identity.verified,
        verificationStatus: identity.type === 'organizations' ? org.verificationStatus : null,
        impactPoints: isUser ? user.impactPoints : null,
      };
    });
    return { data, error: null };
  } catch {
    return { data: null, error: 'Error is Identity API call' };
  }
};

export const getCurrentIdentityAdaptor = (identity: CurrentIdentity | Identity | User | Org | undefined) => {
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
      impactPoints: identity.impactPoints,
    };
  }
  // Identity type
  if ('meta' in identity) {
    const isUser = identity.type === 'users';
    const user = identity.meta as UserRes;
    const org = identity.meta as OrgRes;

    return {
      id: identity.id,
      firstName: isUser ? user.first_name : null,
      lastName: isUser ? user.last_name : null,
      name: isUser ? `${user.first_name} ${user.last_name}` : org.name,
      img: isUser ? user.avatar?.url : org.logo?.url,
      imgId: isUser ? user.avatar?.id : org.logo?.id,
      type: identity.type || 'users',
      username: isUser ? user.username : org.shortname,
      email: user.email,
      verified: isUser ? !!user.identity_verified_at : org.verified,
      verificationStatus: identity.type === 'organizations' ? org.status : null,
      impactPoints: isUser ? user.impact_points : null,
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
      verificationStatus: identity.type === 'organizations' ? org.verificationStatus : null,
      impactPoints: isUser ? user.impactPoints : null,
    };
  }
};

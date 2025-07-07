import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { BADGES } from 'src/constants/BADGES';
import {
  AchievementsRes,
  CurrentIdentity,
  createCredentialsAdaptor,
  getCredentialsConnectionAdaptor,
  getCurrentIdentityAdaptor,
} from 'src/core/adaptors';
import { getTierDetails } from 'src/core/helpers/getTierDetails';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';

export const useAchievementsList = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const { achievementsList } = useLoaderData() as { achievementsList: AchievementsRes };
  const [connectUrl, setConnectUrl] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const { impactPoints } = getCurrentIdentityAdaptor(currentIdentity);
  const currentIdentityImpactPoints = impactPoints || 0;
  const { tier } = getTierDetails(currentIdentityImpactPoints);
  const EXPIRED_QR_CODE = 120_000;

  const hasUnclaimedBadges = achievementsList.some(achievement => !achievement.claimed);

  const flatAchievementsList = achievementsList.reduce(
    (acc, { name, level }) => {
      acc[name] = { level };
      return acc;
    },
    {} as Record<string, { level: number }>,
  );
  const unlockedList = achievementsList.map(achievement => {
    const badge = BADGES[achievement.name];
    return {
      key: achievement.name,
      label: translate(achievement.name),
      iconName: badge.iconName,
      color: badge.color,
      level: achievement.level,
    };
  });
  const inProgressList = Object.entries(BADGES)
    .filter(([key]) => !(key in flatAchievementsList))
    .map(([key, badge]) => ({
      key,
      label: translate(key),
      iconName: badge.iconName,
      color: badge.color,
    }));

  const getConnectData = useCallback(async () => {
    if (!credentialId) return;
    const { error, data } = await getCredentialsConnectionAdaptor(credentialId);
    if (error) return;
    if (data) setConnectUrl(data.connectURL);
  }, [credentialId]);

  useEffect(() => {
    if (!credentialId) return;
    getConnectData();
    const interval = setInterval(getConnectData, EXPIRED_QR_CODE);
    return () => clearInterval(interval);
  }, [credentialId]);

  const onClaimClick = async () => {
    const { error, data } = await createCredentialsAdaptor();
    if (error) return;
    if (data) setCredentialId(data.id);
  };

  return {
    data: {
      currentIdentityImpactPoints,
      tier,
      unlockedList,
      inProgressList,
      hasUnclaimedBadges,
      openClaimModal: !!connectUrl,
      connectUrl,
    },
    operations: {
      onClaimClick,
      setOpenClaimModal: setConnectUrl,
    },
  };
};

import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { BADGES } from 'src/constants/BADGES';
import { AchievementsRes, CurrentIdentity, getCurrentIdentityAdaptor } from 'src/core/adaptors';
import { getTierDetails } from 'src/core/helpers/getTierDetails';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';

export const useAchievementsList = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const { impactPoints } = getCurrentIdentityAdaptor(currentIdentity);
  const { achievementsList } = useLoaderData() as { achievementsList: AchievementsRes };
  const currentIdentityImpactPoints = impactPoints || 0;
  const { tier } = getTierDetails(currentIdentityImpactPoints);

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

  return {
    data: {
      currentIdentityImpactPoints,
      tier,
      unlockedList,
      inProgressList,
    },
  };
};

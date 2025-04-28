import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { BADGES } from 'src/constants/BADGES';
import { TIERS } from 'src/constants/TIERS';
import { AchievementsRes, CurrentIdentity, getCurrentIdentityAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useAchievementsList = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const { impactPoints } = getCurrentIdentityAdaptor(currentIdentity);
  const { achievementsList } = useLoaderData() as { achievementsList: AchievementsRes };
  const currentIdentityImpactPoints = impactPoints || 0;
  const tier = TIERS.find(
    ({ min, max }) => currentIdentityImpactPoints >= min && currentIdentityImpactPoints < max,
  )?.tier;

  const flatAchievementsList = achievementsList.reduce(
    (acc, { name, level }) => {
      acc[name] = { level: level };
      return acc;
    },
    {} as Record<string, { level: number }>,
  );
  const unlockedList = achievementsList.map(achievement => {
    const badge = BADGES[achievement.name];
    return {
      key: achievement.name,
      label: badge.label,
      iconName: badge.iconName,
      color: badge.color,
      level: achievement.level,
    };
  });
  const inProgressList = Object.entries(BADGES)
    .filter(([key]) => !(key in flatAchievementsList))
    .map(([key, badge]) => ({
      key,
      label: badge.label,
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

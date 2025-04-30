import Image from 'src/modules/General/components/Image';
import Medal from 'src/modules/General/components/Medal';
import Progressbar from 'src/modules/General/components/Progressbar';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { AchievementCardProps } from './index.types';

const AchievementCard: React.FC<AchievementCardProps> = ({
  label,
  iconName = '',
  tier = 0,
  color = variables.color_primary_700,
  level = 0,
  point,
  className = '',
}) => {
  const hasPoint = point !== undefined;

  return (
    <div className={`${styles['card']} ${hasPoint && styles['card__tier']} ${className}`}>
      {tier ? (
        <Medal tier={tier} size="lg" />
      ) : (
        <Image src={`/images/achievements/${iconName}.svg`} width={48} height={48} />
      )}
      {hasPoint ? (
        <p className={styles['card__point']}>{point}</p>
      ) : (
        <Progressbar length={3} level={level} color={color} />
      )}
      {label}
    </div>
  );
};

export default AchievementCard;

import Image from '../Image';
import styles from './index.module.scss';
import { MedalProps } from './index.types';

const Medal: React.FC<MedalProps> = ({ tier, size = 'sm', className = '' }) => {
  const generateSize = {
    sm: '40px',
    md: '48px',
    lg: '56px',
  };

  return (
    <div className={styles['container']} style={{ width: generateSize[size], height: generateSize[size] }}>
      <Image src="/images/medal.svg" alt={`tier-${tier}`} width="100%" height="100%" />
      <span className={`${styles['tier']} ${styles[`tier--${size}`]} ${className}`}>{tier}</span>
    </div>
  );
};

export default Medal;

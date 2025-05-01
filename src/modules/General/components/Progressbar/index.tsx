import styles from './index.module.scss';
import { ProgressbarProps } from './index.types';

const Progressbar: React.FC<ProgressbarProps> = ({ length, level, color }) => {
  return (
    <div className={styles['container']}>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className={styles['level']} style={index < level ? { backgroundColor: color } : undefined} />
      ))}
    </div>
  );
};

export default Progressbar;

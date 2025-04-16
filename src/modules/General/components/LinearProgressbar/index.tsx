import React from 'react';

import styles from './index.module.scss';
import { ProgressBarProps } from './index.types';

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  description = '',
  containerClassName = '',
  customStyle = '',
}) => {
  return (
    <div className={`${styles['container']} ${containerClassName}`}>
      <div className={styles['progress']}>
        <div className={`${styles['bar']} ${customStyle}`} style={{ width: `${value}%` }} />
      </div>
      {description && <p className={styles['description']}>{description}</p>}
    </div>
  );
};

export default ProgressBar;

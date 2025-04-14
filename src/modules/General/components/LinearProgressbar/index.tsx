import React from 'react';

import styles from './index.module.scss';
import { ProgressBarProps } from './index.types';

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className={styles['progress-container']}>
      <div className={styles['progress-fill']} style={{ width: `${value}%` }} />
      adfs
    </div>
  );
};

export default ProgressBar;

import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';

import styles from './index.module.scss';

export const FallBack = () => {
  const flag = 'refreshed';
  const refreshed = sessionStorage.getItem(flag);

  if (!refreshed) {
    sessionStorage.setItem(flag, `${new Date().getTime()}`);
    window.location.reload();
    return <></>;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['error__code']}>500</div>
      <div className={styles['error__msg']}>{translate('error-internal.header')}</div>
      <div className={styles['error__details']}>{translate('error-internal.subheader')}</div>
      <div className={styles['content']}>
        <Button color="primary" variant="outlined" className={styles['content__button']}>
          <a href="/" className={styles['content__link']}>
            {translate('error-internal.home-btn')}
          </a>
        </Button>
      </div>
    </div>
  );
};

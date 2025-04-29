import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import AlertMessage from 'src/modules/General/components/AlertMessage';
import { AlertMessageProps } from 'src/modules/General/components/AlertMessage/index.types';
import Button from 'src/modules/General/components/Button';
import Image from 'src/modules/General/components/Image';

import styles from './index.module.scss';
import { KYCProps } from './index.types';

const KYC: React.FC<KYCProps> = ({ connectUrl, status }) => {
  const alertMessageProps = {
    succeed: {
      theme: 'success' as AlertMessageProps['theme'],
      iconName: 'check-circle',
      title: translate('verification-kyc.banner-success-title'),
      subtitle: translate('verification-kyc.banner-success-subtitle'),
    },
    failed: {
      theme: 'error' as AlertMessageProps['theme'],
      iconName: 'alert-circle',
      title: translate('verification-kyc.banner-error-title'),
      subtitle: translate('verification-kyc.banner-error-subtitle'),
      children: (
        <Link to="/verification" className="link !text-Error-700">
          {translate('verification-kyc.banner-error-btn')}
        </Link>
      ),
    },
  };
  return (
    <div className={styles['container']}>
      {status ? (
        <AlertMessage {...alertMessageProps[status]} containerClassName="!items-start" />
      ) : (
        <>
          <AlertMessage
            theme="gray"
            iconName="alert-circle"
            title={translate('verification-kyc.why-verify-title')}
            subtitle={translate('verification-kyc.why-verify-subtitle')}
            containerClassName="!items-start"
          >
            <Link to="" className="link mt-3">
              {translate('verification-kyc.learn-more')}
            </Link>
          </AlertMessage>
          <div className={styles['verify']}>
            {translate('verification-kyc.how-verify')}
            <span className={styles['verify__subtitle']}>{translate('verification-kyc.download-wallet')}</span>
          </div>
          <div className={styles['verify__download']}>
            <Link to="https://wallet.socious.io/ios" target="_blank">
              <Image
                src="/images/app-store.svg"
                alt="App Store"
                width="100%"
                height="100%"
                className="cursor-pointer"
              />
            </Link>
            <Link to="https://wallet.socious.io/android" target="_blank">
              <Image
                src="/images/google-play.svg"
                alt="Google Play"
                width="100%"
                height="100%"
                className="cursor-pointer"
              />
            </Link>
          </div>
          <ol className={styles['verify__steps']}>
            <li>{translate('verification-kyc.how-verify-step1')}</li>
            <li>{translate('verification-kyc.how-verify-step2')}</li>
          </ol>
          <div className={styles['verify__qrcode']}>
            <QRCodeSVG value={connectUrl} size={200} />
          </div>
          <Button
            variant="contained"
            color="primary"
            customStyle="self-end"
            onClick={() => {
              const newTab = window.open(connectUrl, '_blank');
              newTab?.focus();
            }}
          >
            {translate('verification-kyc.open-wallet')}
          </Button>
        </>
      )}
    </div>
  );
};

export default KYC;

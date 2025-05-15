import { Link } from 'react-router-dom';
import logo from 'src/assets/logo/wallet-logo.svg';
import { KYCStatus } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import AlertMessage from 'src/modules/General/components/AlertMessage';
import { AlertMessageProps } from 'src/modules/General/components/AlertMessage/index.types';
import Button from 'src/modules/General/components/Button';
import Image from 'src/modules/General/components/Image';

import styles from './index.module.scss';
import { KYCProps } from './index.types';
import QRModal from './QRModal';
import { useKYC } from './useKYC';

const KYC: React.FC<KYCProps> = ({ connectUrl, status }) => {
  const {
    data: { openQRModal },
    operations: { setOpenQRModal, onVerify, onCreateVerification },
  } = useKYC(connectUrl);

  const alertMessageProps: Record<KYCStatus, AlertMessageProps> = {
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
        <Button variant="text" color="error" customStyle={styles['banner__btn']} onClick={onCreateVerification}>
          {translate('verification-kyc.banner-error-btn')}
        </Button>
      ),
    },
    exceeded: {
      theme: 'error' as AlertMessageProps['theme'],
      iconName: 'alert-circle',
      title: translate('verification-kyc.banner-exceeded-title'),
      subtitle: translate('verification-kyc.banner-exceeded-subtitle'),
      children: (
        <Button variant="text" color="error" customStyle={styles['banner__btn']} onClick={onCreateVerification}>
          {translate('verification-kyc.banner-exceeded-btn')}
        </Button>
      ),
    },
    '': {
      theme: 'gray' as AlertMessageProps['theme'],
      iconName: 'alert-circle',
      title: translate('verification-kyc.why-verify-title'),
      subtitle: translate('verification-kyc.why-verify-subtitle'),
      children: (
        <Link to="https://socious.io/verified-credentials" className="link mt-3">
          {translate('verification-kyc.learn-more')}
        </Link>
      ),
    },
  };

  return (
    <div className={styles['container']}>
      <AlertMessage {...alertMessageProps[status]} containerClassName="!items-start" />
      {!status && (
        <>
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
          <div className={styles['verify__qrcode']}>
            <Image src="/images/socious-wallet-qrcode.svg" alt="Socious Wallet Download" width="100%" height="100%" />
            <Image src={logo} alt="Socious Wallet Logo" className={styles['verify__logo']} />
            Download Socious Wallet
          </div>
          <div className={styles['verify__steps']}>
            <p>{translate('verification-kyc.how-verify-step1')}</p>
            <p>{translate('verification-kyc.how-verify-step2')}</p>
          </div>
          <Button variant="contained" color="primary" customStyle="self-end" disabled={!connectUrl} onClick={onVerify}>
            {translate('verification-kyc.verify-now')}
          </Button>
          <QRModal open={openQRModal} handleClose={() => setOpenQRModal(false)} connectUrl={connectUrl} />
        </>
      )}
    </div>
  );
};

export default KYC;

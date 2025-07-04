import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import AlertMessage from 'src/modules/General/components/AlertMessage';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Image from 'src/modules/General/components/Image';
import Modal from 'src/modules/General/components/Modal';

import styles from './index.module.scss';
import { ClaimBadgeModalProps } from './index.types';

const ClaimBadgeModal: React.FC<ClaimBadgeModalProps> = ({ open, handleClose, connectUrl }) => {
  const footerJSX = (
    <div className="w-full px-4 py-5 md:p-6 md:hidden">
      <Button color="primary" block>
        {translate('impact-achievements.claim-badge.open-wallet')}
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={translate('impact-achievements.claim-badge.modal-title')}
      icon={<FeaturedIcon iconName="shield-tick" type="modern" theme="gray" size="lg" />}
      footer={footerJSX}
      inlineTitle={false}
      mobileFullHeight
      customStyle={styles['modal']}
      contentClassName={styles['modal__content']}
    >
      <AlertMessage
        theme="gray"
        title={translate('impact-achievements.claim-badge.alert-title')}
        subtitle={translate('impact-achievements.claim-badge.alert-subtitle')}
      />
      <div className={styles['modal__wallet']}>
        {translate('impact-achievements.claim-badge.how-get-certificate')}
        <ol className={styles['modal__steps']}>
          <li>{translate('impact-achievements.claim-badge.step-1')}</li>
          <li className="hidden md:list-item">{translate('impact-achievements.claim-badge.step-2')}</li>
          <li>{translate('impact-achievements.claim-badge.step-3')}</li>
        </ol>
      </div>
      <div className={styles['modal__qrcode']}>
        <QRCodeSVG value={connectUrl} size={128} />
      </div>
      <div className={styles['modal__download']}>
        {translate('impact-achievements.claim-badge.download-wallet')}
        <div className={styles['modal__apps']}>
          <Link to="https://wallet.socious.io/ios" target="_blank">
            <Image src="/images/app-store.svg" alt="App Store" width="100%" height="100%" className="cursor-pointer" />
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
      </div>
    </Modal>
  );
};

export default ClaimBadgeModal;

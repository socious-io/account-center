import { QRCodeSVG } from 'qrcode.react';
import { translate } from 'src/core/helpers/utils';
import Modal from 'src/modules/General/components/Modal';

import styles from './index.module.scss';
import { QRModalProps } from './index.types';

const QRModal: React.FC<QRModalProps> = ({ open, handleClose, connectUrl }) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={translate('verification-kyc.modal-title')}
      subTitle={translate('verification-kyc.modal-subtitle')}
      headerDivider={false}
      footerDivider={false}
      mobileCentered
      customStyle={styles['container']}
      contentClassName={styles['content']}
    >
      <div className={styles['qrcode']}>
        <QRCodeSVG value={connectUrl} size={200} />
      </div>
    </Modal>
  );
};

export default QRModal;

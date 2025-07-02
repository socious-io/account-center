import { Link } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import AlertMessage from 'src/modules/General/components/AlertMessage';
import { AlertMessageProps } from 'src/modules/General/components/AlertMessage/index.types';
import Button from 'src/modules/General/components/Button';
import ProgressFileUploader from 'src/modules/General/components/ProgressFileUploader';

import styles from './index.module.scss';
import { SuccessModal } from './SuccessModal';
import { useKYB } from './useKYB';

const KYB: React.FC = () => {
  const {
    data: { status, verified, files, progressValues, uploadedErrors, error, loading, openSuccessModal },
    operations: { onDropFiles, onDeleteFiles, onSend, handleCloseSuccessModal },
  } = useKYB();

  const alertMessageProps = {
    ACTIVE: {
      theme: 'success' as AlertMessageProps['theme'],
      iconName: 'check-circle',
      title: translate('verification-kyb.banner-success-title'),
      subtitle: translate('verification-kyb.banner-success-subtitle'),
    },
    PENDING: {
      theme: 'warning' as AlertMessageProps['theme'],
      iconName: 'alert-circle',
      title: translate('verification-kyb.banner-pending-title'),
      subtitle: translate('verification-kyb.banner-pending-subtitle'),
      children: (
        <Link to="https://socious.io/contact" target="_blank" className="link !text-Warning-700">
          {translate('verification-kyb.banner-pending-btn')}
        </Link>
      ),
    },
  };

  return verified ? (
    <div className={styles['container']}>
      <AlertMessage {...alertMessageProps[status]} containerClassName="!items-start" />
    </div>
  ) : (
    <>
      <div className={styles['container']}>
        <AlertMessage
          theme="gray"
          iconName="alert-circle"
          iconTheme="warning"
          title={translate('verification-kyb.verify-title')}
          subtitle={translate('verification-kyb.verify-subtitle')}
          containerClassName="!items-start"
        />
        <ProgressFileUploader
          files={files}
          onDropFiles={onDropFiles}
          onDeleteFiles={onDeleteFiles}
          fileTypes={['PDF', 'PNG', 'JPG']}
          progressValues={progressValues}
          uploadedErrors={uploadedErrors}
          maxSize={2}
          maxFiles={10}
          error={error}
          loading={loading}
          customStyle="w-full h-[126px]"
        />
        <Button
          variant="contained"
          color="primary"
          customStyle="self-end"
          disabled={!files.length || !!Object.values(uploadedErrors).some(Boolean) || loading}
          onClick={onSend}
        >
          {translate('verification-kyb.send-btn')}
        </Button>
        <div className={styles['next']}>
          <span className={styles['next__title']}>{translate('verification-kyb.what-next')}</span>
          <ul className={styles['next__list']}>
            <li>{translate('verification-kyb.what-next-step1')}</li>
            <li>{translate('verification-kyb.what-next-step2')}</li>
            <li>{translate('verification-kyb.what-next-step3')}</li>
          </ul>
        </div>
      </div>
      <SuccessModal open={openSuccessModal} handleClose={handleCloseSuccessModal} />
    </>
  );
};

export default KYB;

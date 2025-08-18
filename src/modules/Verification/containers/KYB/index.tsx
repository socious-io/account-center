import { Link } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import AlertMessage from 'src/modules/General/components/AlertMessage';
import { AlertMessageProps } from 'src/modules/General/components/AlertMessage/index.types';
import Button from 'src/modules/General/components/Button';
import ProgressFileUploader from 'src/modules/General/components/ProgressFileUploader';
import Stepper from 'src/modules/Verification/components/Stepper';

import styles from './index.module.scss';
import SuccessModal from './SuccessModal';
import { useKYB } from './useKYB';

const KYB: React.FC = () => {
  const {
    data: { status, files, progressValues, uploadedErrors, error, loading, openSuccessModal },
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

  const steps = [
    {
      title: translate('verification-kyb.instructions-step1-title'),
      subtitle: translate('verification-kyb.instructions-step1-subtitle'),
      iconName: 'mail-01',
      displayDivider: true,
    },
    {
      title: translate('verification-kyb.instructions-step2-title'),
      subtitle: translate('verification-kyb.instructions-step2-subtitle'),
      iconName: 'hourglass-03',
      displayDivider: true,
    },
    {
      title: translate('verification-kyb.instructions-step3-title'),
      subtitle: translate('verification-kyb.instructions-step3-subtitle'),
      iconName: 'stars-02',
      displayDivider: false,
    },
  ];

  return status !== 'NOT_ACTIVE' ? (
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
        <div className={styles['instruction']}>
          {steps.map(item => (
            <Stepper key={item.title} {...item} />
          ))}
        </div>
        <ProgressFileUploader
          files={files}
          onDropFiles={onDropFiles}
          onDeleteFiles={onDeleteFiles}
          fileTypes={['PDF']}
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
      </div>
      <SuccessModal open={openSuccessModal} handleClose={handleCloseSuccessModal} />
    </>
  );
};

export default KYB;

import { Modal } from '@mui/material';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { AlertModalProps } from './index.types';
import Button from '../Button';
import Icon from '../Icon';
import Image from '../Image';

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  onClose,
  message,
  customImage,
  title,
  onSubmit,
  closeButton = true,
  closeButtonLabel = 'Close',
  submitButton = false,
  submitButtonTheme = 'primary',
  submitButtonLabel,
  customIcon,
  children,
  disableSubmitButton = false,
  customClassName,
  primaryBtnClassName,
  secondaryBtnClassName,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={styles['modal']} data-ignore-outside-click="true">
      <div className={`${styles['container']} ${customClassName}`}>
        <div className="flex justify-between">
          {customIcon || (
            <Image className={styles['image']} src={customImage || '/icons/success-tick.svg'} alt="success" />
          )}
          <Icon
            name="x-close"
            fontSize={24}
            color={variables.color_grey_500}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className={styles['title']}>{title}</div>
        {message.split('<br/>').map(substr => (
          <div key={substr} className={styles['message']}>
            {substr}
          </div>
        ))}

        {children && <div className="w-full overflow-y-auto">{children}</div>}
        {(submitButton || closeButton) && (
          <div className="w-full flex flex-col md:flex-row-reverse gap-3 mt-6 md:mt-8">
            {submitButton && (
              <Button
                color={submitButtonTheme}
                variant="contained"
                onClick={onSubmit}
                fullWidth
                disabled={disableSubmitButton}
                customStyle={primaryBtnClassName}
              >
                {submitButtonLabel}
              </Button>
            )}
            {closeButton && (
              <Button
                color="secondary"
                variant="outlined"
                onClick={onClose}
                fullWidth
                customStyle={secondaryBtnClassName}
              >
                {closeButtonLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AlertModal;

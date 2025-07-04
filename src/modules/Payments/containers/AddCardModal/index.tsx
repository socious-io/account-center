import { translate } from 'src/core/helpers/utils';
import AlertModal from 'src/modules/General/components/AlertModal';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { AddCardModalProps } from './index.types';
import { useAddCardModal } from './useAddCardModal';

const AddCardModal: React.FC<AddCardModalProps> = ({ open, handleClose, onAddCard }) => {
  const {
    data: { completedInfoCard, errorMessage },
    operations: { setErrorMessage, onSubmit },
  } = useAddCardModal(open, handleClose, onAddCard);

  const footerJSX = (
    <div className="w-full p-4 md:p-6">
      <Button color="primary" variant="contained" fullWidth disabled={!completedInfoCard} onClick={onSubmit}>
        {translate('payment-cards.add-btn')}
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title={translate('payment-cards.add-card')}
        mobileFullHeight={false}
        mobileCentered
        footer={footerJSX}
        customStyle="md:max-w-[480px]"
        contentClassName="p-4 md:p-6"
      >
        <div id="card-element" />
      </Modal>
      <AlertModal
        open={!!errorMessage}
        onClose={() => setErrorMessage('')}
        title={translate('payment-cards.failed')}
        message={errorMessage}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButton={false}
        submitButton={false}
      />
    </>
  );
};

export default AddCardModal;

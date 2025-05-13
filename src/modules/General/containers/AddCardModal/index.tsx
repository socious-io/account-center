import AlertModal from 'src/modules/General/components/AlertModal';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { AddCardModalProps } from './index.types';
import { useAddCardModal } from './useAddCardModal';

const AddCardModal: React.FC<AddCardModalProps> = ({ open, handleClose, setCardsList, currency }) => {
  const {
    data: { openErrorModal, errorMessage },
    operations: { onSubmit, setOpenErrorModal },
  } = useAddCardModal(open, handleClose, setCardsList, currency);

  const footerJSX = (
    <div className="w-full p-4 md:p-6">
      <Button color="primary" variant="contained" onClick={onSubmit} fullWidth>
        Add
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title="Add a credit card"
        mobileFullHeight={false}
        footer={footerJSX}
      >
        <div className="p-4 md:p-6">
          <div id="card-element" />
        </div>
      </Modal>
      <AlertModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        title="Failed"
        message={errorMessage}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButton={false}
        submitButton={false}
      />
    </>
  );
};

export default AddCardModal;

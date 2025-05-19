import { Link } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import AlertModal from 'src/modules/General/components/AlertModal';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';

import styles from './index.module.scss';
import { AddPayoutAccountModalProps } from './index.types';
import { useAddPayoutAccountModal } from './useAddPayoutAccountModal';

const AddPayoutAccountModal: React.FC<AddPayoutAccountModalProps> = ({ open, handleClose }) => {
  const {
    data: { stripeLink, errorMessage },
    operations: { onSelectCountry, setErrorMessage },
  } = useAddPayoutAccountModal();

  const footerJSX = (
    <div className={styles['modal__footer']}>
      <Button variant="outlined" color="info" fullWidth onClick={handleClose}>
        {translate('payments-method-payout-account.add-cancel-btn')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!stripeLink}
        component={Link}
        to={stripeLink}
        target="_blank"
      >
        {translate('payments-method-payout-account.add-continue-btn')}
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        icon={<FeaturedIcon iconName="credit-card-down" size="lg" type="modern" theme="gray" />}
        title={translate('payments-method-payout-account.add')}
        subTitle={translate('payments-method-payout-account.add-desc')}
        footer={footerJSX}
        headerDivider={false}
        footerDivider={false}
        inlineTitle={false}
        mobileFullHeight={false}
        mobileCentered
        customStyle="md:max-w-[480px]"
        contentClassName={styles['modal__content']}
      >
        {/* FIXME: ask BE about country */}
        <SearchDropdown
          placeholder="Search a country"
          icon="search-lg"
          options={[]}
          isSearchable
          onChange={onSelectCountry}
        />
      </Modal>
      <AlertModal
        open={!!errorMessage}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
        title={translate('payments-method-payout-account.add-failed')}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButton={false}
      />
    </>
  );
};

export default AddPayoutAccountModal;

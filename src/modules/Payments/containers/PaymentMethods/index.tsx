import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import ConnectButton from 'src/modules/General/components/ConnectButton';
import Icon from 'src/modules/General/components/Icon';
import Image from 'src/modules/General/components/Image';
import CreditCard from 'src/modules/Payments/components/CreditCard';
import PayoutAccount from 'src/modules/Payments/components/PayoutAccount';
import AddCardModal from 'src/modules/Payments/containers/AddCardModal';
import AddPayoutAccountModal from 'src/modules/Payments/containers/AddPayoutAccountModal';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { usePaymentMethods } from './usePaymentMethods';

const PaymentMethods = () => {
  const {
    data: { currentList, currentIdentityName, currentIdentityType, openModal, stripeAccounts },
    operations: { setCurrentList, setOpenModal, handleCloseModal, onRemoveCard, onSetWallet },
  } = usePaymentMethods();

  const creditCards = currentList.map(card => {
    const iconPath = `/icons/pay-icons/${card.brand?.toLowerCase().replaceAll(' ', '')}.svg`;
    return {
      id: card.id,
      name: currentIdentityName,
      date: `${card.exp_month}/${card.exp_year?.toString().slice(-2)}`,
      cardNumber: `**** **** **** ${card.last4}`,
      holderImage: <Image src={iconPath} alt={`${card.brand}-card`} />,
    };
  });

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['header']}>
          {translate('payments-methods-title')}
          <span className={styles['subheader']}>{translate('payments-methods-desc')}</span>
        </div>
        {!!creditCards.length && (
          <div className={styles['cards']}>
            {creditCards.map(card => (
              <CreditCard key={card.id} {...card} onRemoveCard={onRemoveCard} />
            ))}
          </div>
        )}
        <Button
          color="info"
          startIcon={<Icon name="credit-card-plus" color={variables.color_grey_700} cursor="pointer" />}
          onClick={() => setOpenModal({ name: 'add-card', open: true })}
        >
          {translate('payment-cards.add-card')}
        </Button>
        <Divider />
        {currentIdentityType === 'users' && (
          <>
            <div className={styles['section']}>
              {translate('payments-method-payout-account.title')}
              {stripeAccounts.length ? (
                stripeAccounts.map(account => (
                  <PayoutAccount key={account.account} name={account.bankName} number={`**${account.last4}`} />
                ))
              ) : (
                <Button color="info" onClick={() => setOpenModal({ name: 'add-account', open: true })}>
                  {translate('payments-method-payout-account.add')}
                </Button>
              )}
            </div>
            <Divider />
          </>
        )}
        <div className={styles['section']}>
          {translate('payments-method-crypto-wallet.title')}
          <ConnectButton onSetWallet={onSetWallet} />
        </div>
      </div>
      <AddCardModal
        open={openModal.name === 'add-card' && openModal.open}
        handleClose={handleCloseModal}
        onAddCard={card => setCurrentList([card, ...currentList])}
      />
      <AddPayoutAccountModal open={openModal.name === 'add-account' && openModal.open} handleClose={handleCloseModal} />
    </>
  );
};

export default PaymentMethods;

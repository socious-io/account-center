import { Divider } from '@mui/material';
import Image from 'src/modules/General/components/Image';
import CreditCard from 'src/modules/Payments/components/CreditCard';
import PayoutAccount from 'src/modules/Payments/components/PayoutAccount';

import styles from './index.module.scss';
import { usePaymentMethods } from './usePaymentMethods';

const PaymentMethods = () => {
  const {
    data: { currentList, currentIdentityName, currentIdentityType },
  } = usePaymentMethods();

  const creditCards = currentList.map(card => {
    const iconPath = `/icons/pay-icons/${card.meta.brand?.toLowerCase().replaceAll(' ', '')}.svg`;
    return {
      id: card.id,
      name: currentIdentityName,
      date: `${card.meta.exp_month}/${card.meta.exp_year?.toString().slice(-2)}`,
      cardNumber: card.meta?.last4 ? `1234 1234 1234 ${card.meta?.last4}` : '',
      holderImage: <Image src={iconPath} alt={`${card.meta?.brand}-card`} />,
    };
  });

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        Payment methods
        <span className={styles['subheader']}>
          Payment methods are saved in your Socious ID account so you can use them across Socious ecosystem.
        </span>
      </div>
      <div className={styles['cards']}>
        {creditCards.map(card => (
          <CreditCard key={card.id} {...card} />
        ))}
      </div>
      <Divider />
      {currentIdentityType === 'users' && (
        <>
          <div className={styles['section']}>
            Payout account
            {/* FIXME: replace static data with BE API */}
            <PayoutAccount name="HSBC" number="••6543" />
          </div>
          <Divider />
        </>
      )}
      <div className={styles['section']}>Crypto Wallet</div>
    </div>
  );
};

export default PaymentMethods;

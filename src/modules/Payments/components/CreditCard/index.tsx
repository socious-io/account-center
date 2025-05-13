import Icon from 'src/modules/General/components/Icon';
import Image from 'src/modules/General/components/Image';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { CreditCardProps } from './index.types';

const CreditCard: React.FC<CreditCardProps> = ({ id, name, date, cardNumber, holderImage, onRemoveCard }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['card']}>
        <Image src="/icons/pay-pass.svg" className={styles['card__icon']} />
        <Image src="/images/lines.svg" className={styles['card__lines']} />
        <div className={styles['card__info']}>
          <div className={styles['card__number']}>
            <div className={styles['card__name']}>
              {name}
              <span>{date}</span>
            </div>
            {cardNumber}
          </div>
          {holderImage}
        </div>
      </div>
      {onRemoveCard && (
        <Icon
          name="x-close"
          fontSize={24}
          color={variables.color_grey_500}
          cursor="pointer"
          containerClass={styles['card__remove']}
          onClick={() => onRemoveCard(id)}
        />
      )}
    </div>
  );
};

export default CreditCard;

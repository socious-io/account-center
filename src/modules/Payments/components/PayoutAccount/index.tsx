import { translate } from 'src/core/helpers/utils';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { PayoutAccountProps } from './index.types';

const PayoutAccount: React.FC<PayoutAccountProps> = ({ name, number, onRemove, onEdit }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['left']}>
        <Icon name="bank-1" fontSize={20} color={variables.color_grey_500} containerClass={styles['left__icon']} />
        <div className={styles['left__info']}>
          {name}
          <span className={styles['left__info--light']}>
            {translate('payments-method-payout-account.saving')} {number}
          </span>
        </div>
      </div>
      <div className={styles['right']}>
        {onRemove && (
          <Icon
            name="trash-01"
            fontSize={20}
            color={variables.color_grey_600}
            onClick={onRemove}
            cursor="pointer"
            containerClass={styles['right__icon']}
          />
        )}
        {onEdit && (
          <Icon
            name="edit-01"
            fontSize={20}
            color={variables.color_grey_600}
            onClick={onEdit}
            cursor="pointer"
            containerClass={styles['right__icon']}
          />
        )}
      </div>
    </div>
  );
};

export default PayoutAccount;

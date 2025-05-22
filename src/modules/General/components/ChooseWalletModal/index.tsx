import { translate } from 'src/core/helpers/utils';
import Modal from 'src/modules/General/components/Modal';

import styles from './index.module.scss';
import { ChooseWalletModalProps } from './index.types';
import Image from '../Image';

const ChooseWalletModal: React.FC<ChooseWalletModalProps> = ({
  open,
  handleClose,
  title = translate('payments-method-crypto-wallet.connect'),
  headerDivider = false,
  footerDivider = false,
  mobileCentered = true,
  wallets,
  onWalletSelect,
  ...props
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      centerHeader
      headerDivider={headerDivider}
      footerDivider={footerDivider}
      mobileCentered={mobileCentered}
      customStyle="md:max-w-[480px]"
      contentClassName="py-4 md:py-6"
      {...props}
    >
      <div className={styles['wallets']}>
        {wallets.map(wallet => (
          <div key={wallet.name} className={styles['wallet']}>
            <div className={styles['wallet__logo']}>
              <Image
                src={wallet.type === 'evm' ? `/images/wallets/${wallet.icon}.svg` : wallet.icon}
                alt={wallet.name}
                width={42}
                height={42}
                className="cursor-pointer"
                onClick={() => onWalletSelect(wallet)}
              />
            </div>
            {wallet.name}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ChooseWalletModal;

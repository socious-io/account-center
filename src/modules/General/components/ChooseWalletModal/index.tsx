import Modal from 'src/modules/General/components/Modal';

import styles from './index.module.scss';
import { ChooseWalletModalProps } from './index.types';

const ChooseWalletModal: React.FC<ChooseWalletModalProps> = ({
  open,
  handleClose,
  title = 'Connect your wallet',
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
              <img
                src={wallet.icon}
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

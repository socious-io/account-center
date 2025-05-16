import { ModalProps } from '../Modal/index.types';

export interface ChooseWalletModalProps extends ModalProps {
  //FIXME: replace any
  wallets: any[];
  onWalletSelect: (wallet: any) => void;
}

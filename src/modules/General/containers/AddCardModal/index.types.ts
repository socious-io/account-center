import { Card } from 'src/core/adaptors';

export interface AddCardModalProps {
  open: boolean;
  handleClose: () => void;
  setCardsList: (list: Card[]) => void;
  currency?: string;
}

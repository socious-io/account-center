import { Card } from 'src/core/adaptors';

export interface AddCardModalProps {
  open: boolean;
  handleClose: () => void;
  onAddCard: (newCard: Card) => void;
}

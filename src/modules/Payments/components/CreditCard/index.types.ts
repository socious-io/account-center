export interface CreditCardProps {
  id: string;
  name: string;
  date: string;
  cardNumber: string;
  holderImage: React.ReactNode;
  onRemoveCard?: (cardId: string) => void;
}

export interface PayoutAccountProps {
  name: string;
  number: string;
  onRemove?: () => void;
  onEdit?: () => void;
}

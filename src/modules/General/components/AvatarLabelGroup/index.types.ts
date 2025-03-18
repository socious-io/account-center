import { Meta } from 'src/core/adaptors';

export interface AvatarLabelGroupProps {
  account: Meta;
  customStyle?: string;
  handleClick?: () => void;
  avatarSize?: string;
  removeFull?: boolean;
}

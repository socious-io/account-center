import { CurrentIdentity } from 'src/core/adaptors';

export interface AvatarLabelGroupProps {
  account: CurrentIdentity;
  customStyle?: string;
  handleClick?: () => void;
  avatarSize?: string;
  removeFull?: boolean;
}

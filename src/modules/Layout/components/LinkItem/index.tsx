import Icon from 'src/modules/General/components/Icon';

import styles from './index.module.scss';
import { LinkItemProps } from './index.types';

const LinkItem: React.FC<LinkItemProps> = ({ iconName, title, isSelected = false, onClick }) => {
  return (
    <div className={`${styles['container']} ${isSelected && styles['selected']}`} onClick={onClick}>
      <Icon name={iconName} fontSize={24} className={`${styles['icon']} ${isSelected && styles['selected']}`} />
      {title}
    </div>
  );
};

export default LinkItem;

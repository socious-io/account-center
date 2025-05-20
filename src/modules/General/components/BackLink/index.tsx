import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';

import styles from './index.module.scss';
import { BackLinkProps } from './index.types';
import Button from '../Button';
import Icon from '../Icon';

const BackLink: React.FC<BackLinkProps> = ({
  title = translate('layout.back'),
  block = false,
  onBack,
  customStyle = '',
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      color="secondary"
      variant="text"
      onClick={onClick}
      block={block}
      fullWidth
      className={`${styles['button']} ${customStyle}`}
    >
      <Icon name="arrow-left" fontSize={20} className="text-Gray-light-mode-600" />
      {title}
    </Button>
  );
};

export default BackLink;

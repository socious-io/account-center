import Avatar from '../Avatar';
import styles from './index.module.scss';
import { AvatarGroupProps } from './index.types';

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  accounts,
  visibleCount = accounts.length,
  size = '32px',
  showMore = false,
  customStyle = '',
}) => {
  const visibleAccounts = accounts.slice(0, visibleCount);
  const hiddenAccountCount = accounts.length - visibleCount;
  const shouldShowMore = showMore && hiddenAccountCount > 0;

  return (
    <div className={styles['container']}>
      {visibleAccounts.map(account => {
        return (
          <Avatar
            key={account.id}
            size={size}
            type={account.type || 'users'}
            img={account.image || ''}
            customStyle={`${styles['account']} ${customStyle}`}
          />
        );
      })}
      {shouldShowMore && (
        <div className={styles['more']} style={{ width: size, height: size }}>
          +{hiddenAccountCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;

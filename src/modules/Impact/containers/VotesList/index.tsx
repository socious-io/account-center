import { toRelativeTime } from 'src/core/helpers/relative-time';
import { translate } from 'src/core/helpers/utils';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import PaginationMobile from 'src/modules/General/components/PaginationMobile';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useVotesList } from './useVotesList';

const VotesList = () => {
  const {
    data: { currentList, page, totalPage },
    operations: { onChangePage },
  } = useVotesList();

  return (
    !!currentList.length && (
      <div className={styles['container']}>
        {currentList.map(list => {
          const donationType =
            list.type === 'donate' ? translate('impact-votes.donated') : translate('impact-votes.voted');
          return (
            <div key={list.id} className={styles['list']}>
              <div className={styles['list__left']}>
                <Icon
                  name="heart-hand"
                  fontSize={24}
                  color={variables.color_grey_500}
                  className={styles['list__icon']}
                />
                <div className={styles['list__info']}>
                  <span className={styles['list__info--bold']}>{list.donated_identity.name}</span>
                  <span className="hidden md:inline text-sm">
                    {donationType} {toRelativeTime(list.date)}
                  </span>
                  <div className={styles['list__info--mobile']}>
                    <span className={styles['list__info--bold']}>
                      {list.donated_price} {list.currency} {list.type === 'donate' && '•'}
                    </span>
                    {donationType} {toRelativeTime(list.date)}
                  </div>
                </div>
              </div>
              {list?.donated_price && (
                <div className={styles['list__price']}>
                  {list.donated_price.toLocaleString()} {list.currency}
                  <span className={styles['list__price--soft']}>(${list.converted_value} USD)</span>
                </div>
              )}
            </div>
          );
        })}
        <div className={`${styles['pagination']} hidden md:block`}>
          <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
        </div>
        <div className={`${styles['pagination']} block md:hidden`}>
          <PaginationMobile page={page} count={totalPage} handleChange={onChangePage} />
        </div>
      </div>
    )
  );
};

export default VotesList;

import { Divider } from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { ClaimedAchievement, Referral } from 'src/core/adaptors';
import { formatDate } from 'src/core/helpers/relative-time';
import { beautifyText } from 'src/core/helpers/texts';
import { translate } from 'src/core/helpers/utils';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import { Account } from 'src/modules/General/components/AvatarLabelGroup/index.types';
import Icon from 'src/modules/General/components/Icon';
import Pagination from 'src/modules/General/components/Pagination';
import PaginationMobile from 'src/modules/General/components/PaginationMobile';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useMyReferral } from './useMyReferral';

const MyReferral = () => {
  const {
    data: { currentList, page, totalPage },
    operations: { onChangePage },
  } = useMyReferral();

  const columns = useMemo<ColumnDef<Referral>[]>(() => {
    const staticColumns: ColumnDef<Referral>[] = [
      {
        id: 'identity',
        header: translate('refer-table.name'),
        accessorKey: 'identity',
        cell: ({ getValue }: { getValue: Getter<Account> }) => <AvatarLabelGroup account={getValue()} />,
      },
      {
        id: 'date',
        header: translate('refer-table.date'),
        accessorKey: 'date',
        cell: ({ getValue }: { getValue: Getter<string> }) => formatDate(getValue()),
      },
    ];

    const achievements = Array.from(
      new Set(currentList.flatMap(ref => Object.keys(ref).filter(key => key !== 'identity' && key !== 'date'))),
    );
    const dynamicColumns: ColumnDef<Referral>[] = achievements.map(type => ({
      id: type,
      header: beautifyText(type),
      accessorKey: type,
      cell: ({ getValue }: { getValue: Getter<ClaimedAchievement> }) => {
        const claimed = getValue()?.claimed;
        const done = getValue()?.done;
        return (
          <div className={claimed ? styles['table__claimed'] : styles['table__unclaimed']}>
            {done ? translate('refer-table.claimed') : translate('refer-table.unclaimed')}
            <Icon
              name={claimed ? 'tick' : 'alert-circle'}
              fontSize={12}
              color={claimed ? variables.color_success_700 : variables.color_error_600}
              className={styles['table__icon']}
            />
          </div>
        );
      },
    }));

    return [...staticColumns, ...dynamicColumns];
  }, [currentList]);

  const table = useReactTable({
    data: currentList,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    !!currentList.length && (
      <>
        <span className={styles['header']}>{translate('refer-list')}</span>
        <Divider />
        <div className={styles['table']}>
          <table className="w-full rounded-lg">
            <thead className={styles['header']}>
              {table.getHeaderGroups().map(headerGroup => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th id={header.id} key={header.id} className={styles['header__item']}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={styles['table__row']}>
                  {row.getVisibleCells().map(cell => (
                    <td className={styles['table__col']} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`${styles['table__pagination']} hidden md:block`}>
            <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
          </div>
          <div className={`${styles['table__pagination']} block md:hidden`}>
            <PaginationMobile page={page} count={totalPage} handleChange={onChangePage} />
          </div>
        </div>
      </>
    )
  );
};

export default MyReferral;

import { ColumnDef, flexRender, getCoreRowModel, Getter, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Contribution } from 'src/core/adaptors';
import { toRelativeTime } from 'src/core/helpers/relative-time';
import { translate } from 'src/core/helpers/utils';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import { Account } from 'src/modules/General/components/AvatarLabelGroup/index.types';
import Pagination from 'src/modules/General/components/Pagination';
import PaginationMobile from 'src/modules/General/components/PaginationMobile';

import styles from './index.module.scss';
import { useContributionsList } from './useContributionsList';

const ContributionsList = () => {
  const {
    data: { currentList, page, totalPage },
    operations: { onChangePage },
  } = useContributionsList();

  const columns = useMemo<ColumnDef<Contribution>[]>(
    () => [
      {
        id: 'identity',
        header: '',
        accessorKey: 'identity',
        cell: ({ getValue }: { getValue: Getter<Account> }) => (
          <>
            <AvatarLabelGroup account={getValue()} />
          </>
        ),
      },
      {
        id: 'date',
        header: translate('impact-contributions.date'),
        accessorKey: 'date',
        cell: ({ getValue }: { getValue: Getter<string> }) => toRelativeTime(getValue()),
      },
      {
        id: 'type',
        header: translate('impact-contributions.type'),
        accessorKey: 'type',
        cell: ({ getValue }: { getValue: Getter<string> }) => <span className="font-medium">{getValue()}</span>,
      },
      {
        id: 'points',
        header: translate('impact-contributions.points'),
        accessorKey: 'points',
        cell: ({ getValue }: { getValue: Getter<string> }) => (
          <span className={styles['table__col--bold']}>+{getValue()}</span>
        ),
      },
    ],
    [currentList],
  );

  const table = useReactTable({
    data: currentList,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    !!currentList.length && (
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
    )
  );
};

export default ContributionsList;

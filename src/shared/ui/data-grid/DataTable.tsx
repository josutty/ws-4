import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Cell,
  type ColumnDef,
  type Header,
  type RowData,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';

import { displayCellValue, isStickyColumn } from './data-grid';

export type DataTableProps<TData extends RowData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  emptyMessage?: string;
  frozenColumnId?: string;
  isLoading?: boolean;
  label?: string;
};

const headerClassName =
  'sticky top-0 z-10 whitespace-nowrap border-b border-border bg-surface px-2.5 py-2 text-left text-xs font-bold uppercase tracking-wide text-muted';
const cellClassName =
  'border-b border-border px-2.5 py-2 text-sm text-fg';
const stickyClassName = 'sticky left-0 z-20 bg-surface';
type StickyMeta = { sticky?: 'left' | 'right' };

function headerIsSticky<TData extends RowData>(
  header: Header<TData, unknown>,
  frozenColumnId: string | undefined,
) {
  return isStickyColumn(
    header.column.id,
    frozenColumnId,
    (header.column.columnDef.meta as StickyMeta | undefined)?.sticky,
  );
}

function cellIsSticky<TData extends RowData>(
  cell: Cell<TData, unknown>,
  frozenColumnId: string | undefined,
) {
  return isStickyColumn(
    cell.column.id,
    frozenColumnId,
    (cell.column.columnDef.meta as StickyMeta | undefined)?.sticky,
  );
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  emptyMessage = 'No data available',
  frozenColumnId,
  isLoading = false,
  label = 'Data table',
}: DataTableProps<TData>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasRows = table.getRowModel().rows.length > 0;

  return (
    <section aria-label={label} className="w-full">
      {isLoading ? (
        <div aria-label="Loading data" role="status" className="p-2 text-sm text-muted">
          Loading data
        </div>
      ) : null}
      {!isLoading && !hasRows ? (
        <div role="status" className="p-2 text-sm text-muted">
          {emptyMessage}
        </div>
      ) : null}
      <div className="w-full overflow-x-auto">
        <table aria-label={label} className="min-w-max border-collapse" role="grid" aria-busy={isLoading}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} role="row">
                {headerGroup.headers.map((header) => {
                  const sticky = headerIsSticky(header, frozenColumnId);
                  return (
                    <th
                      key={header.id}
                      aria-colspan={header.colSpan}
                      className={`${headerClassName}${sticky ? ` ${stickyClassName}` : ''}`}
                      colSpan={header.colSpan}
                      role="columnheader"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} role="row">
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const sticky = cellIsSticky(cell, frozenColumnId);
                  const content = flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  );
                  const CellElement = cellIndex === 0 && sticky ? 'th' : 'td';
                  return (
                    <CellElement
                      key={cell.id}
                      className={`${cellClassName}${sticky ? ` ${stickyClassName}` : ''}`}
                      scope={CellElement === 'th' ? 'row' : undefined}
                      role={CellElement === 'th' ? 'rowheader' : 'cell'}
                    >
                      {(content as ReactNode) ?? (displayCellValue(cell.getValue()) as ReactNode)}
                    </CellElement>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

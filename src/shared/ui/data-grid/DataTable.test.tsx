import type { ColumnDef } from '@tanstack/react-table';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DataTable } from './DataTable';

type DealerRow = {
  subVertical: string;
  lines: number;
  july: number | null;
  demandMix: string;
};

const columns: ColumnDef<DealerRow>[] = [
  {
    accessorKey: 'subVertical',
    header: 'SUB-VERTICAL',
    meta: { sticky: 'left' },
  },
  {
    accessorKey: 'lines',
    header: 'LINES',
  },
  {
    id: 'yourIndent',
    header: 'YOUR INDENT',
    columns: [
      {
        accessorKey: 'july',
        header: 'JULY 2026',
        cell: ({ getValue }) => getValue<number | null>() ?? '–',
      },
      {
        accessorKey: 'demandMix',
        header: 'Demand mix ▾',
      },
    ],
  },
];

const rows: DealerRow[] = [
  { subVertical: 'Passenger', lines: 12, july: null, demandMix: 'Balanced' },
];

describe('DataTable', () => {
  it('keeps the frozen first column usable with a sticky left-0 row header', () => {
    render(<DataTable columns={columns} data={rows} frozenColumnId="subVertical" />);

    expect(screen.getByRole('rowheader', { name: 'Passenger' })).toHaveClass('sticky', 'left-0');
  });

  it('renders grouped headers with a colspan equal to the number of child columns', () => {
    render(<DataTable columns={columns} data={rows} />);

    const groupHeader = screen.getByRole('columnheader', { name: 'YOUR INDENT' });
    expect(groupHeader).toHaveAttribute('colspan', '2');
    expect(within(groupHeader).getByText('YOUR INDENT')).toBeInTheDocument();
  });

  it('announces loading state with an accessible loading label', () => {
    render(<DataTable columns={columns} data={[]} isLoading />);

    expect(screen.getByRole('grid')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: 'Loading data' })).toBeInTheDocument();
  });

  it('announces an empty result and renders empty numeric values as an en dash', () => {
    render(<DataTable columns={columns} data={rows} />);

    expect(screen.getByRole('cell', { name: '–' })).toBeInTheDocument();

    render(<DataTable columns={columns} data={[]} emptyMessage="No data available" />);
    expect(screen.getByRole('status')).toHaveTextContent('No data available');
  });
});

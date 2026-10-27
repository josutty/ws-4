import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { IndentAccuracyReport } from './IndentAccuracyReport';
import { IndentRollup } from './IndentRollup';

const reportLabels = [
  'Your indent accuracy',
  '4-cycle average',
  'bias',
  'Indent',
  'offtake',
  '▸ View report card',
  'Indent accuracy — last four cycles',
  'By outlet',
  'By vehicle',
  'Monthly',
  'Outlet',
  'Vehicle',
  'Accuracy',
  'Bias',
  'YOUR INDENT',
  'JULY 2026',
  'W1',
  'W2',
  'W3',
  'W4',
  'JUL',
  'AUG',
  'SEP',
  'TOTAL',
  'FERT',
];

const rollupLabels = [
  'Rollup',
  'Group by',
  'Vertical',
  'Sub-vertical',
  'MPG',
  'Tonnage',
  'AC / Non-AC',
  'Segment',
  'FERT',
  'YOUR INDENT',
  'JULY 2026',
  'Demand mix',
  'Stock',
  'Off L3',
  'Ret L3',
  'Δ vs last',
  'Total',
];

describe('dealer dashboard report and rollup', () => {
  it('renders the exact report and rollup design labels in order', async () => {
    const { user } = renderWithProviders(
      <>
        <IndentAccuracyReport />
        <IndentRollup />
      </>,
    );

    await screen.findByText('Indent accuracy — last four cycles');
    const report = screen.getByRole('region', { name: 'Indent accuracy — last four cycles' });
    const rollup = screen.getByRole('region', { name: 'Rollup' });
    await user.click(within(rollup).getByRole('button', { name: 'Expand FERT' }));

    for (const [region, labels] of [[report, reportLabels], [rollup, rollupLabels]] as const) {
      const regionText = region.textContent ?? '';
      let previousIndex = -1;
      for (const label of labels) {
        const index = regionText.indexOf(label, previousIndex + 1);
        expect(index, `missing label: ${label}`).toBeGreaterThan(-1);
        expect(index, `out of order label: ${label}`).toBeGreaterThan(previousIndex);
        previousIndex = index;
      }
    }
  });

  it('switches between outlet and vehicle views', async () => {
    const { user } = renderWithProviders(<IndentAccuracyReport />);
    const outlet = await screen.findByRole('button', { name: 'By outlet' });
    const vehicle = screen.getByRole('button', { name: 'By vehicle' });

    expect(outlet).toHaveAttribute('data-state', 'on');
    await user.click(vehicle);
    expect(vehicle).toHaveAttribute('data-state', 'on');
    expect(outlet).toHaveAttribute('data-state', 'off');
    expect(screen.getByText('Vehicle')).toBeInTheDocument();
  });

  it('shows an empty vehicle history', async () => {
    const { user } = renderWithProviders(<IndentAccuracyReport />);
    await user.click(await screen.findByRole('button', { name: 'By vehicle' }));

    expect(await screen.findByText('No vehicle history')).toBeInTheDocument();
    expect(screen.getByText('–')).toBeInTheDocument();
  });

  it('renders grouped headers with child-column spans', async () => {
    renderWithProviders(<IndentAccuracyReport />);

    const indentGroup = await screen.findByRole('columnheader', { name: 'YOUR INDENT' });
    const julyGroup = screen.getByRole('columnheader', { name: 'JULY 2026' });
    expect(indentGroup).toHaveAttribute('colspan', '4');
    expect(julyGroup).toHaveAttribute('colspan', '4');
    expect(within(indentGroup).getByRole('columnheader', { name: 'W1' })).toBeInTheDocument();
  });

  it('keeps the first column frozen in a horizontally scrolling grid', async () => {
    renderWithProviders(<IndentAccuracyReport />);

    const firstColumn = await screen.findByRole('rowheader', { name: 'Outlet' });
    expect(firstColumn).toHaveClass('sticky', 'left-0');
    expect(firstColumn.closest('[class*="overflow-x"]')).not.toBeNull();
  });

  it('expands grouped rollups and shows totals', async () => {
    const { user } = renderWithProviders(<IndentRollup />);
    const groupBy = await screen.findByRole('group', { name: 'Group by' });
    await user.click(within(groupBy).getByRole('button', { name: 'Vertical' }));

    const row = await screen.findByRole('row', { name: /FERT/ });
    const expand = within(row).getByRole('button', { name: /expand/i });
    await user.click(expand);
    expect(await screen.findByRole('row', { name: /Total/i })).toBeInTheDocument();
    expect(screen.getByText('Demand mix')).toBeInTheDocument();
    expect(screen.getByText('Δ vs last')).toBeInTheDocument();
  });

  it('marks empty values with an en dash and positive differences with a plus sign', async () => {
    renderWithProviders(<IndentRollup />);

    expect(await screen.findByText('–')).toBeInTheDocument();
    expect(screen.getByText(/^\+\d/)).toBeInTheDocument();
  });
});

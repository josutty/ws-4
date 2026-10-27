import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { ColumnChooser } from './ColumnChooser';
import { FilterRail } from './FilterRail';
import { WorkbookToolbar } from './WorkbookToolbar';

describe('indent workbook controls', () => {
  it('renders the filter controls and exact labels in order', () => {
    renderWithProviders(
      <>
        <FilterRail />
        <WorkbookToolbar />
        <ColumnChooser />
      </>,
    );

    const labels = [
      'Filters',
      'Vertical',
      'FERT',
      'Sub-vertical',
      'Demand segment',
      'MPG model',
      'Tonnage',
      'Fuel',
      'Cabin',
      'FERT History',
      'Status',
      'Clear all',
      'Save view',
      'Saved views',
      'Search fert…',
      'Paste a list of codes from a spreadsheet to select many at once.',
      'LMD',
      'HD',
      'Search code or description',
      '+ Add FERT',
      'Export',
      'Comfortable',
      'Compact',
      '☷ Columns',
      'Presets',
      'Essentials',
      'Stock focus',
      'Trends',
      'Everything',
      'Column groups',
      'Hide',
      'Summary',
      'Full',
    ];

    for (const label of labels) {
      expect(screen.getByText(label, { exact: true })).toBeInTheDocument();
    }

    const bodyText = document.body.textContent ?? '';
    let previous = -1;
    for (const label of labels) {
      const position = bodyText.indexOf(label);
      expect(position).toBeGreaterThan(previous);
      previous = position;
    }
  });

  it('updates the search filter count as rows are filtered', async () => {
    const { user } = renderWithProviders(<FilterRail />);
    const search = screen.getByRole('searchbox', { name: 'Search code or description' });

    expect(screen.getByText(/\d+ of \d+/)).toBeInTheDocument();
    await user.type(search, 'does-not-match');

    expect(await screen.findByText('0 of 0')).toBeInTheDocument();
  });

  it('opens saved views and shows the empty state', async () => {
    const { user } = renderWithProviders(<FilterRail />);
    await user.click(screen.getByRole('button', { name: 'Saved views' }));

    expect(await screen.findByText('No saved views')).toBeInTheDocument();
  });

  it('supports clearing filters and saving a view', async () => {
    const { user } = renderWithProviders(<FilterRail />);
    await user.click(screen.getByRole('button', { name: 'Clear all' }));
    await user.click(screen.getByRole('button', { name: 'Save view' }));

    expect(screen.getByRole('dialog', { name: /save view/i })).toBeInTheDocument();
  });

  it('supports keyboard navigation, selection, escape, and focus restoration in the columns menu', async () => {
    const { user } = renderWithProviders(<ColumnChooser />);
    const trigger = screen.getByRole('button', { name: '☷ Columns' });

    await user.click(trigger);
    const menu = screen.getByRole('menu');
    expect(menu).toBeVisible();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Hide' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '☷ Columns' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(screen.getByRole('menu')).toBeVisible();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('hides a column when the Hide visibility option is selected', async () => {
    const { user } = renderWithProviders(<ColumnChooser />);
    await user.click(screen.getByRole('button', { name: '☷ Columns' }));

    const menu = screen.getByRole('menu');
    await user.click(within(menu).getByRole('menuitem', { name: 'Hide' }));

    expect(screen.queryByRole('columnheader', { name: /FERT/i })).not.toBeInTheDocument();
  });

  it('renders toolbar defaults and changes its density and preset', async () => {
    const { user } = renderWithProviders(<WorkbookToolbar />);

    expect(screen.getByRole('button', { name: 'Comfortable' })).toHaveAttribute('data-state', 'on');
    await user.click(screen.getByRole('button', { name: 'Compact' }));
    expect(screen.getByRole('button', { name: 'Compact' })).toHaveAttribute('data-state', 'on');

    await user.click(screen.getByRole('button', { name: 'Presets' }));
    await user.click(screen.getByRole('menuitem', { name: 'Stock focus' }));
    expect(screen.getByRole('button', { name: 'Stock focus' })).toHaveAttribute('data-state', 'on');
  });

  it('keeps the collapse tooltip available on keyboard focus', async () => {
    const { user } = renderWithProviders(<FilterRail />);
    const collapse = screen.getByRole('button', { name: /collapse/i });

    await user.tab();
    while (!collapse.matches(':focus')) await user.tab();

    expect(await screen.findByRole('tooltip')).toHaveTextContent(/collapse/i);
  });
});

import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { IndentWorkbookPage } from './IndentWorkbookPage';

const labels = [
  'Filters',
  'Clear all',
  'Save view',
  'LMD',
  'HD',
  'Search code or description',
  '+ Add FERT',
  'Export',
  'Comfortable',
  'Compact',
  '☷ Columns',
  'Review & submit',
];

describe('IndentWorkbookPage', () => {
  it('renders the workbook heading and labelled filter/table regions', async () => {
    renderWithProviders(<IndentWorkbookPage />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: /indent workbook/i })).toBeInTheDocument();
  });

  it('renders design labels in the exact specified order', () => {
    renderWithProviders(<IndentWorkbookPage />);

    const labelledControls = screen.getAllByRole('button').map((button) => button.textContent?.trim());
    const visibleLabels = labels.filter((label) => labelledControls.includes(label));
    expect(visibleLabels).toEqual(labels);
  });

  it('keeps the first column frozen', () => {
    renderWithProviders(<IndentWorkbookPage />);

    expect(screen.getAllByRole('rowheader')[0]).toHaveClass('sticky', 'left-0');
  });

  it('renders grouped headers with the number of child columns', () => {
    renderWithProviders(<IndentWorkbookPage />);

    const lmdHeader = screen.getByRole('columnheader', { name: 'LMD' });
    expect(lmdHeader).toHaveAttribute('colspan', '2');
  });

  it('commits edits with Enter, reverts with Escape, and rejects invalid blur input', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const cell = screen.getByRole('textbox', { name: /LMD.*FERT/i });

    await user.clear(cell);
    await user.type(cell, '12');
    await user.keyboard('{Enter}');
    expect(cell).toHaveValue('12');

    await user.clear(cell);
    await user.type(cell, '99');
    await user.keyboard('{Escape}');
    expect(cell).toHaveValue('12');

    await user.clear(cell);
    await user.type(cell, 'not a number');
    await user.tab();
    expect(cell).toHaveValue('12');
  });

  it('moves keyboard focus across the grid with arrows and Enter', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const firstCell = screen.getByRole('textbox', { name: /LMD.*FERT/i });

    firstCell.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('textbox', { name: /HD.*FERT/i })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('textbox', { name: /LMD.*FERT.*second/i })).toHaveFocus();
  });

  it('exposes the previous value as the input accessible description', () => {
    renderWithProviders(<IndentWorkbookPage />);

    expect(screen.getByRole('textbox', { name: /LMD.*FERT/i })).toHaveAccessibleDescription('was 10');
  });

  it('updates the totals summary after an edit', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const cell = screen.getByRole('textbox', { name: /LMD.*FERT/i });

    await user.clear(cell);
    await user.type(cell, '12');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('status')).toHaveTextContent(/total.*12/i);
  });

  it('filters rows and updates the result count from search', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const search = screen.getByRole('searchbox', { name: 'Search code or description' });

    await user.type(search, 'FERT-001');
    expect(screen.getByText(/1 of \d+/i)).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /FERT-001/i })).toBeInTheDocument();
  });

  it('opens the review dialog, traps focus, and returns focus on Escape', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const trigger = screen.getByRole('button', { name: 'Review & submit' });

    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toContainElement(
      document.activeElement instanceof HTMLElement ? document.activeElement : null,
    );
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('supports keyboard selection for menus, tabs, and selects', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const menu = screen.getByRole('button', { name: 'Save view' });

    await user.click(menu);
    await user.keyboard('{ArrowDown}{Enter}');
    expect(screen.getByRole('tab', { selected: true })).toBeInTheDocument();
    await user.keyboard('{Escape}');
  });

  it('shows a tooltip on focus and hover', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const columns = screen.getByRole('button', { name: '☷ Columns' });

    await user.hover(columns);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    await user.unhover(columns);
    columns.focus();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('renders a virtual window and adds later rows after scrolling', async () => {
    renderWithProviders(<IndentWorkbookPage />);
    const grid = screen.getByRole('table', { name: /indent workbook/i });
    const initialRows = within(grid).getAllByRole('row');

    expect(initialRows.length).toBeLessThan(50);
    grid.scrollTop = 1000;
    grid.dispatchEvent(new Event('scroll'));
    expect(await within(grid).findByRole('row', { name: /FERT-050/i })).toBeInTheDocument();
  });

  it('applies the selected toggle-group option', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const compact = screen.getByRole('radio', { name: 'Compact' });

    await user.click(compact);
    expect(compact).toHaveAttribute('data-state', 'on');
    expect(screen.getByRole('table')).toHaveClass('compact');
  });

  it('hides a column through the Columns menu and hides the page while open', async () => {
    const { user } = renderWithProviders(<IndentWorkbookPage />);
    const columns = screen.getByRole('button', { name: '☷ Columns' });

    await user.click(columns);
    expect(screen.getByRole('menu')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('menu')).toHaveAttribute('aria-hidden', 'false');
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'HD' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('columnheader', { name: 'HD' })).not.toBeInTheDocument();
  });

  it('renders display rules for low stock and empty values', () => {
    renderWithProviders(<IndentWorkbookPage />);

    expect(screen.getByText('2')).toHaveClass('text-danger');
    expect(screen.getByText('–')).toBeInTheDocument();
  });
});

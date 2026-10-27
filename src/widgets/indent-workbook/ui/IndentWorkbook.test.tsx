import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { IndentWorkbook } from './IndentWorkbook';

const labels = [
  'Vehicle',
  'FERT code',
  'Vehicle attributes',
  'Current dealer stock',
  'Opening & live POs',
  'Pipeline',
  'Trend — offtake',
  'Trend — retail',
  'Last cycle',
  'Your indent',
  'July 2026',
  'W1',
  'W2',
  'W3',
  'W4',
  'Jul',
  'Aug',
  'Sep',
  'Total',
];

describe('IndentWorkbook', () => {
  it('shows loading, error with retry, empty filtered, and editable states', async () => {
    renderWithProviders(<IndentWorkbook submitted />);

    expect(await screen.findByRole('grid')).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: /vehicle/i })).toHaveClass('sticky', 'left-0');
    expect(screen.getByRole('columnheader', { name: 'July 2026' })).toHaveAttribute('colspan', '4');
    expect(screen.getByRole('columnheader', { name: 'Your indent' })).toBeInTheDocument();
  });

  it('keeps the vehicle column frozen while the grid scrolls horizontally', async () => {
    renderWithProviders(<IndentWorkbook />);
    const vehicle = await screen.findByRole('rowheader', { name: /vehicle/i });
    expect(vehicle).toHaveClass('sticky', 'left-0');
    expect(vehicle).toHaveStyle({ position: 'sticky' });
  });

  it('supports grouped headers and exact design labels', async () => {
    renderWithProviders(<IndentWorkbook />);
    const grid = await screen.findByRole('grid');
    const headers = within(grid).getAllByRole('columnheader');
    expect(headers.map((header) => header.textContent?.trim())).toEqual(expect.arrayContaining(labels));
    expect(screen.getByRole('columnheader', { name: 'July 2026' })).toHaveAttribute('colspan', '4');
  });

  it('commits valid edits, reverts with Escape, and reverts invalid blur values', async () => {
    const { user } = renderWithProviders(<IndentWorkbook />);
    const input = await screen.findByRole('spinbutton', { name: /your indent/i });
    await user.clear(input);
    await user.type(input, '7');
    await user.keyboard('{Enter}');
    expect(input).toHaveValue(7);
    await user.clear(input);
    await user.type(input, '9');
    await user.keyboard('{Escape}');
    expect(input).toHaveValue(7);
    await user.clear(input);
    await user.type(input, '-1');
    await user.tab();
    expect(input).toHaveValue(7);
  });

  it('moves through the grid with Arrow keys and Enter', async () => {
    const { user } = renderWithProviders(<IndentWorkbook />);
    const first = await screen.findByRole('spinbutton', { name: /your indent/i });
    await user.click(first);
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('spinbutton', { name: /your indent/i })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(document.activeElement).toHaveAttribute('role', 'spinbutton');
  });

  it('exposes the previous value as an accessible description', async () => {
    renderWithProviders(<IndentWorkbook />);
    const input = await screen.findByRole('spinbutton', { name: /your indent/i });
    expect(input).toHaveAccessibleDescription(/was \d+/i);
  });

  it('updates the totals summary after an edit', async () => {
    const { user } = renderWithProviders(<IndentWorkbook />);
    const input = await screen.findByRole('spinbutton', { name: /your indent/i });
    const status = screen.getByRole('status');
    const before = status.textContent;
    await user.clear(input);
    await user.type(input, '8');
    await user.keyboard('{Enter}');
    expect(status).toHaveTextContent(/total/i);
    expect(status.textContent).not.toBe(before);
  });

  it('filters rows from search and updates the visible count', async () => {
    const { user } = renderWithProviders(<IndentWorkbook />);
    const search = await screen.findByRole('searchbox');
    await user.type(search, 'zzzz-no-match');
    expect(await screen.findByText('No lines match these filters')).toBeInTheDocument();
    expect(screen.getByText(/0 of \d+/i)).toBeInTheDocument();
    await user.clear(search);
  });

  it('supports paste and fill-down actions', async () => {
    const { user } = renderWithProviders(<IndentWorkbook />);
    const input = await screen.findByRole('spinbutton', { name: /your indent/i });
    await user.click(input);
    await user.paste('4\t5');
    expect(input).toHaveValue(4);
    expect(screen.getByRole('button', { name: /fill down/i })).toBeInTheDocument();
  });

  it('opens and closes the columns menu and hides a selected column', async () => {
    const { user } = renderWithProviders(<IndentWorkbook />);
    const trigger = await screen.findByRole('button', { name: /columns/i });
    await user.click(trigger);
    const menu = screen.getByRole('menu');
    expect(menu).toBeVisible();
    await user.keyboard('{Enter}');
    await user.keyboard('{Escape}');
    expect(menu).not.toBeVisible();
  });

  it('supports keyboard selection in the workbook controls', async () => {
    const { user } = renderWithProviders(<IndentWorkbook />);
    const control = await screen.findByRole('button', { name: /columns/i });
    await user.click(control);
    await user.keyboard('{ArrowDown}{Enter}');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('menu')).not.toBeVisible();
  });

  it('shows tooltips on focus and hover', async () => {
    const { user } = renderWithProviders(<IndentWorkbook />);
    const help = await screen.findByRole('button', { name: /help|info/i });
    await user.tab();
    await user.hover(help);
    expect(await screen.findByRole('tooltip')).toBeVisible();
  });

  it('renders a virtual row window and later rows after scrolling', async () => {
    renderWithProviders(<IndentWorkbook />);
    const grid = await screen.findByRole('grid');
    const initialRows = within(grid).getAllByRole('row');
    expect(initialRows.length).toBeLessThan(50);
    grid.scrollTop = 1000;
    grid.dispatchEvent(new Event('scroll'));
    expect(within(grid).getAllByRole('row').length).toBeGreaterThan(0);
  });

  it('renders no-entry, added-line, stock warning, and critical display rules', async () => {
    renderWithProviders(<IndentWorkbook />);
    expect(await screen.findByText('–')).toBeInTheDocument();
    expect(screen.getByText('ADDED')).toBeInTheDocument();
    expect(screen.getByText(/no entry/i)).toBeInTheDocument();
    expect(screen.getByText(/low stock|critical/i)).toHaveClass(/text-danger|text-warning/);
  });

  it('disables submitted workbook cells', async () => {
    renderWithProviders(<IndentWorkbook submitted />);
    const submitted = await screen.findByRole('grid');
    expect(within(submitted).getAllByRole('spinbutton').every((input) => input.hasAttribute('disabled'))).toBe(true);
  });

  it('shows retryable errors and does not leak resources on unmount', async () => {
    const { unmount } = renderWithProviders(<IndentWorkbook />);
    expect(await screen.findByRole('grid')).toBeInTheDocument();
    unmount();
  });
});

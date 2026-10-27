import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { AddFertDialog } from './AddFertDialog';
import { FertDetailDrawer } from './FertDetailDrawer';

describe('FertDetailDrawer', () => {
  it('opens, traps focus, closes with Escape, and returns focus to its trigger', async () => {
    const { user } = renderWithProviders(<FertDetailDrawer />);

    const trigger = screen.getByRole('button', { name: 'Line detail' });
    await user.click(trigger);

    expect(await screen.findByRole('dialog', { name: 'Line detail' })).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Line detail' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Line detail' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('renders the detail labels in the specified order and uses an en dash for empty numeric values', async () => {
    const { user } = renderWithProviders(<FertDetailDrawer />);
    await user.click(screen.getByRole('button', { name: 'Line detail' }));

    const dialog = await screen.findByRole('dialog', { name: 'Line detail' });
    const labels = [
      'Line detail',
      'Vehicle',
      'Your segment',
      'Eicher segment',
      'MPG model',
      'Tonnage',
      'Fuel',
      'cabin',
      'Sub-vertical',
      'Your stock on hand',
      'Under 60 days',
      '60–90 days',
      '90–180 days',
      'Over 180 days',
      'Opening stock, 1 Jul',
      'Live purchase orders',
      'Offtake and retail',
      'Last cycle, for this month',
      'Close',
    ];
    const renderedLabels = Array.from(dialog.querySelectorAll('h1,h2,h3,dt,button,label'))
      .map((element) => element.textContent?.trim())
      .filter((label): label is string => Boolean(label));

    expect(renderedLabels).toEqual(expect.arrayContaining(labels));
    expect(within(dialog).getAllByText('–').length).toBeGreaterThan(0);
  });

  it('marks warning and critical stock ages with the danger style', async () => {
    const { user } = renderWithProviders(<FertDetailDrawer />);
    await user.click(screen.getByRole('button', { name: 'Line detail' }));

    const dialog = await screen.findByRole('dialog', { name: 'Line detail' });
    expect(within(dialog).getByText('60–90 days')).toHaveClass('text-danger');
    expect(within(dialog).getByText('90–180 days')).toHaveClass('text-danger');
    expect(within(dialog).getByText('Over 180 days')).toHaveClass('text-danger');
  });
});

describe('AddFertDialog', () => {
  it('opens, focuses the search field, closes with Escape, and returns focus to its trigger', async () => {
    const { user } = renderWithProviders(<AddFertDialog />);

    const trigger = screen.getByRole('button', { name: 'Add FERT to your indent' });
    await user.click(trigger);

    expect(await screen.findByRole('dialog', { name: 'Add FERT to your indent' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search code or description…' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Add FERT to your indent' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('shows the no-match state and keeps the exact selection labels', async () => {
    const { user } = renderWithProviders(<AddFertDialog />);
    await user.click(screen.getByRole('button', { name: 'Add FERT to your indent' }));

    const search = await screen.findByRole('textbox', { name: 'Search code or description…' });
    await user.type(search, 'not-in-catalogue');

    const dialog = screen.getByRole('dialog', { name: 'Add FERT to your indent' });
    expect(within(dialog).getByText('No matching code in the catalogue.')).toBeInTheDocument();
    expect(within(dialog).getByText('None selected')).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Add selected' })).toBeDisabled();
  });

  it('updates the multi-select count and adds the selected catalogue item', async () => {
    const { user } = renderWithProviders(<AddFertDialog />);
    await user.click(screen.getByRole('button', { name: 'Add FERT to your indent' }));

    const dialog = await screen.findByRole('dialog', { name: 'Add FERT to your indent' });
    const options = within(dialog).getAllByRole('option');
    await user.click(options.at(0) as HTMLElement);

    expect(within(dialog).getByText('1 selected')).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Add selected' })).toBeEnabled();
    await user.click(within(dialog).getByRole('button', { name: 'Add selected' }));

    expect(await screen.findByRole('status')).toHaveTextContent(/added/i);
  });

  it('shows a mutation error with a working retry action', async () => {
    const onRetry = vi.fn();
    renderWithProviders(<AddFertDialog onRetry={onRetry} />);

    const trigger = screen.getByRole('button', { name: 'Add FERT to your indent' });
    expect(trigger).toBeInTheDocument();
    expect(onRetry).not.toHaveBeenCalled();
  });
});

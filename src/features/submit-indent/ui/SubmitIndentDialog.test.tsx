import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';

import { SubmitIndentDialog } from './SubmitIndentDialog';

describe('SubmitIndentDialog', () => {
  it('opens on the review trigger, traps focus, closes with Escape, and returns focus', async () => {
    const { user } = renderWithProviders(<SubmitIndentDialog />);
    const trigger = screen.getByRole('button', { name: 'Review & submit' });

    await user.click(trigger);

    const dialog = await screen.findByRole('dialog', { name: 'Review & submit' });
    const activeElement = document.activeElement;
    expect(activeElement).toBeInstanceOf(HTMLElement);
    if (!(activeElement instanceof HTMLElement)) {
      throw new Error('Expected the dialog to contain the focused element');
    }
    expect(dialog).toContainElement(activeElement);

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog', { name: 'Review & submit' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('shows full-vertical, filtered, and missing-entry warnings', async () => {
    const { user } = renderWithProviders(<SubmitIndentDialog />);
    await user.click(screen.getByRole('button', { name: 'Review & submit' }));

    const dialog = await screen.findByRole('dialog', { name: 'Review & submit' });
    expect(within(dialog).getByText('You have filters applied.')).toBeInTheDocument();
    expect(within(dialog).getByText(/Submitting sends your full/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/lines have no entry\./i)).toBeInTheDocument();
    expect(within(dialog).getByText('Review them first')).toBeInTheDocument();
  });

  it('disables submit and exposes submitting state while the indent is submitted', async () => {
    const { user } = renderWithProviders(<SubmitIndentDialog />);
    await user.click(screen.getByRole('button', { name: 'Review & submit' }));

    const submit = await screen.findByRole('button', { name: 'Submit indent' });
    await user.click(submit);

    expect(submit).toBeDisabled();
    expect(screen.getByRole('status', { name: /submitting/i })).toBeInTheDocument();
  });

  it('keeps the dialog open and offers retry when submission fails', async () => {
    const { user } = renderWithProviders(<SubmitIndentDialog />);
    await user.click(screen.getByRole('button', { name: 'Review & submit' }));

    const dialog = await screen.findByRole('dialog', { name: 'Review & submit' });
    const submit = within(dialog).getByRole('button', { name: 'Submit indent' });
    await user.click(submit);

    const alert = await within(dialog).findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(within(alert).getByRole('button', { name: 'Retry' })).toBeEnabled();
    expect(screen.getByRole('dialog', { name: 'Review & submit' })).toBeInTheDocument();
  });
});

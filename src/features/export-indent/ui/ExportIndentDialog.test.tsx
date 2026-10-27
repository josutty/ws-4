import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@test/test-utils';
import { exportCsv } from '../lib/exportCsv';
import { ExportIndentDialog } from './ExportIndentDialog';

describe('exportCsv', () => {
  it('escapes CSV headers and data rows', () => {
    expect(
      exportCsv({
        headers: ['Indent', 'Description'],
        rows: [
          ['IND-1', 'Widget, large'],
          ['IND-2', 'He said "yes"'],
        ],
      }),
    ).toBe('Indent,Description\nIND-1,"Widget, large"\nIND-2,"He said ""yes"""');
  });
});

describe('ExportIndentDialog', () => {
  it('opens, traps focus, closes with Escape, and returns focus to Export', async () => {
    const { user } = renderWithProviders(<ExportIndentDialog />);
    const trigger = screen.getByRole('button', { name: 'Export' });

    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('renders the exact dialog labels in order', async () => {
    const { user } = renderWithProviders(<ExportIndentDialog />);
    await user.click(screen.getByRole('button', { name: 'Export' }));

    const dialog = await screen.findByRole('dialog');
    expect(
      Array.from(dialog.querySelectorAll('h1,h2,h3,h4,h5,h6,button,p'))
        .map((element) => element.textContent?.trim())
        .filter((label): label is string => Boolean(label)),
    ).toEqual([
      'In the live product this downloads a file. Here it\'s on screen so you can check the shape — select all and copy.',
      'Close',
      'Copy to clipboard',
    ]);
  });

  it('announces successful clipboard copy', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const { user } = renderWithProviders(<ExportIndentDialog />);
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    await user.click(screen.getByRole('button', { name: 'Export' }));
    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }));

    expect(writeText).toHaveBeenCalledOnce();
    expect(await screen.findByRole('status')).toHaveTextContent(/copied/i);
  });

  it('shows the select-text fallback when clipboard copy fails', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('clipboard unavailable'));
    const { user } = renderWithProviders(<ExportIndentDialog />);
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    await user.click(screen.getByRole('button', { name: 'Export' }));
    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }));

    expect(await screen.findByRole('status')).toHaveTextContent(/select.*copy/i);
  });
});

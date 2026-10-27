import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen } from '@test/test-utils';
import userEvent from '@testing-library/user-event';
import { SignOutButton } from './SignOutButton';

function loadThemeToggleButton() {
  const modules = import.meta.glob('../../toggle-theme/index.ts', { eager: true }) as Record<
    string,
    { ThemeToggleButton: typeof SignOutButton }
  >;
  const module = Object.values(modules).at(0);
  if (!module) {
    throw new Error('Theme toggle module is unavailable');
  }
  return module.ThemeToggleButton;
}

describe('session actions', () => {
  it('shows the theme hint on focus and hover', async () => {
    const user = userEvent.setup();
    const ThemeToggleButton = loadThemeToggleButton();
    renderWithProviders(<ThemeToggleButton />);
    const button = screen.getByRole('button', { name: '◐' });

    button.focus();
    expect(await screen.findByRole('tooltip', { name: /dark/i })).toBeInTheDocument();

    await user.unhover(button);
    await user.hover(button);
    expect(await screen.findByRole('tooltip', { name: /dark/i })).toBeInTheDocument();
  });

  it('toggles the pressed theme state', async () => {
    const user = userEvent.setup();
    const ThemeToggleButton = loadThemeToggleButton();
    renderWithProviders(<ThemeToggleButton />);
    const button = screen.getByRole('button', { name: '◐' });

    expect(button).toHaveAttribute('aria-pressed', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('names the sign-out action and clears the session', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<SignOutButton />);
    const dispatch = vi.spyOn(store, 'dispatch');
    const button = screen.getByRole('button', { name: '⎋' });

    button.focus();
    expect(await screen.findByRole('tooltip', { name: 'Sign out' })).toBeInTheDocument();
    await user.click(button);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: expect.stringMatching(/clearSession$/) }),
    );
  });
});

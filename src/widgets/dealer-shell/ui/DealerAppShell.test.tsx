import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { DealerAppShell } from './DealerAppShell';

describe('DealerAppShell', () => {
  it('renders the authenticated dealer landmarks and identity labels', async () => {
    renderWithProviders(<DealerAppShell />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /dealer/i })).toBeInTheDocument();
    expect(screen.getByText('VECVplan')).toBeInTheDocument();
    expect(screen.getByText('Sharma Motors')).toBeInTheDocument();
    expect(screen.getByText('DLR-1002')).toBeInTheDocument();
    expect(screen.getByText('Dealer')).toBeInTheDocument();
  });

  it('marks Home as active and switches the active view through navigation', async () => {
    const { user } = renderWithProviders(<DealerAppShell />);
    const navigation = screen.getByRole('navigation', { name: /dealer/i });
    const home = within(navigation).getByRole('link', { name: 'Home' });
    const workbook = within(navigation).getByRole('link', { name: 'Indent workbook' });

    expect(home).toHaveAttribute('aria-current', 'page');
    await user.click(workbook);

    expect(workbook).toHaveAttribute('aria-current', 'page');
    expect(home).not.toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('heading', { name: 'Indent workbook' })).toBeInTheDocument();
  });

  it('shows the sign-out action in the authenticated header', async () => {
    const { user } = renderWithProviders(<DealerAppShell />);
    const signOut = screen.getByRole('button', { name: /sign out/i });

    expect(signOut).toBeVisible();
    await user.click(signOut);
    expect(signOut).toBeInTheDocument();
  });

  it('provides a responsive navigation toggle for the header', async () => {
    const { user } = renderWithProviders(<DealerAppShell />);
    const toggle = screen.getByRole('button', { name: /open (dealer )?navigation|menu/i });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: /dealer/i })).toBeVisible();
  });
});

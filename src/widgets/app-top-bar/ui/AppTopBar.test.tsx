import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { server } from '@mocks/node';
import { http, HttpResponse } from 'msw';
import { AppTopBar } from './AppTopBar';

describe('AppTopBar', () => {
  it('renders the authenticated header labels in the specified order', async () => {
    renderWithProviders(<AppTopBar />);

    const header = await screen.findByRole('banner');
    const labels = [
      'VECVplan',
      'Home',
      'Indent workbook',
      'S&OP-1A',
      'Jul 2026',
      'Closes in',
      'Status:',
      'Not submitted',
      'Sharma Motors',
      'DLR-1002',
      'Dealer',
    ];

    let previousIndex = -1;
    for (const label of labels) {
      const index = header.textContent?.indexOf(label) ?? -1;
      expect(index).toBeGreaterThan(previousIndex);
      previousIndex = index;
    }
  });

  it('marks Home as the current navigation view and exposes named controls', async () => {
    renderWithProviders(<AppTopBar />);

    expect(await screen.findByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign out|log out/i })).toBeInTheDocument();
  });

  it('uses warning styling for an unsubmitted cycle', async () => {
    renderWithProviders(<AppTopBar />);

    const status = await screen.findByText('Not submitted');
    expect(status).toHaveClass('text-warning');
  });

  it('shows a retry action when identity or cycle loading fails', async () => {
    server.use(
      http.get('*', () => HttpResponse.json({ message: 'Unavailable' }, { status: 503 })),
    );
    renderWithProviders(<AppTopBar />);

    const alert = await screen.findByRole('alert');
    expect(within(alert).getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });
});

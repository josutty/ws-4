import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen } from '@test/test-utils';
import { SignInPage } from './SignInPage';

const designLabels = [
  'VECVplan',
  'S&OP-1A',
  'Jul 2026',
  'Indent closes',
  '15 Jul, 23:59 IST',
  'Sign in',
  'Dealer code or work email.',
  'or',
  'Trouble signing in? Contact Sales Planning support',
  'Prototype',
  'your role and verticals come from your account',
];

describe('SignInPage', () => {
  it('renders one main landmark and one h1', () => {
    renderWithProviders(<SignInPage />);

    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders the design labels in the specified order', () => {
    renderWithProviders(<SignInPage />);
    const pageText = screen.getByRole('main').textContent ?? '';
    let previousIndex = -1;

    for (const label of designLabels) {
      const index = pageText.indexOf(label);
      expect(index, `missing design label: ${label}`).toBeGreaterThan(previousIndex);
      previousIndex = index;
    }
  });
});

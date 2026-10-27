import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen } from '@test/test-utils';
import { DealerHomePage } from './DealerHomePage';

const labels = [
  'Prototype control',
  'Viewing as',
  'Good afternoon, Sharma Motors',
  'July 2026',
  'LMD and HD',
  'Delhi NCR, 3 outlets',
  'Indent progress',
  'Summary —',
  'Rollup',
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
] as const;

describe('DealerHomePage', () => {
  it('renders the dashboard with one main landmark and the expected h1', () => {
    renderWithProviders(<DealerHomePage />);

    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Good afternoon, Sharma Motors' })).toBeInTheDocument();
  });

  it('renders the design labels in the specified order', () => {
    renderWithProviders(<DealerHomePage />);

    const content = screen.getByRole('main').textContent ?? '';
    let previousIndex = -1;
    for (const label of labels) {
      const index = content.indexOf(label, previousIndex + 1);
      expect(index, `Expected label "${label}" in the dashboard`).toBeGreaterThan(previousIndex);
      previousIndex = index + label.length - 1;
    }
  });
});

import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { DemandMixCard } from './DemandMixCard';
import { IndentAccuracyCard } from './IndentAccuracyCard';
import { IndentDemandSignalCard } from './IndentDemandSignalCard';
import { StockOnHandCard } from './StockOnHandCard';

describe('dealer dashboard analytics summary cards', () => {
  it('shows the indent-versus-demand run-rate signal and its action labels', async () => {
    renderWithProviders(<IndentDemandSignalCard />);

    const card = await screen.findByRole('region', { name: 'Indent vs demand signal' });
    expect(card).toHaveTextContent('July indent');
    expect(card).toHaveTextContent('3-month offtake');
    expect(card).toHaveTextContent('against your own offtake run-rate');
    expect(card).toHaveTextContent(/(Increase|Maintain|Reduce) indent/i);
  });

  it('applies the stock age bands and renders an empty value as a dash', async () => {
    renderWithProviders(<StockOnHandCard />);

    const card = await screen.findByRole('region', { name: 'Stock on hand by age' });
    expect(card).toHaveTextContent('units on hand');
    expect(card).toHaveTextContent('over 60 days');
    expect(card).toHaveTextContent('Under 60 days');
    expect(card).toHaveTextContent('60–90 days');
    expect(card).toHaveTextContent('90–180 days');
    expect(card).toHaveTextContent('Over 180 days');
    expect(within(card).getByText('–')).toBeInTheDocument();
  });

  it('uses the Runner, Repeater, and Stranger demand-mix labels and colors', async () => {
    renderWithProviders(<DemandMixCard />);

    const card = await screen.findByRole('region', {
      name: 'Demand mix — Runner / Repeater / Stranger',
    });
    expect(card).toHaveTextContent('FERTs in your July indent');

    for (const label of ['Runner', 'Repeater', 'Stranger']) {
      const item = within(card).getByText(label).closest('[data-demand-type]');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass(`text-${label.toLowerCase()}`);
    }
  });

  it('shows four-cycle accuracy, bias thresholds, and indent/offtake actions', async () => {
    renderWithProviders(<IndentAccuracyCard />);

    const card = await screen.findByRole('region', { name: 'Your indent accuracy' });
    expect(card).toHaveTextContent('4-cycle average');
    expect(card).toHaveTextContent('bias');
    expect(card).toHaveTextContent('Indent');
    expect(card).toHaveTextContent('offtake');
    expect(card).toHaveTextContent(/(On target|Over-forecast|Under-forecast)/i);
  });
});

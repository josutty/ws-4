import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    disconnect() {}
    observe() {}
    unobserve() {}
  } as typeof ResizeObserver;
}

const filterLabels = [
  'Vertical',
  'FERT',
  'Sub-vertical',
  'Demand segment',
  'MPG model',
  'Tonnage',
  'Fuel',
  'Cabin',
  'FERT History',
  'Status',
];

export function FilterRail() {
  const [query, setQuery] = useState('');
  const [savedViewsOpen, setSavedViewsOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const hasMatch = query.trim() === '';

  return (
    <section aria-label="Filters" className="border-b border-border bg-surface p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-fg">Filters</h2>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button aria-label="Collapse filters" className="rounded px-2 py-1 text-fg-muted hover:bg-surface-subtle">
                ‹
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="rounded bg-fg px-2 py-1 text-xs text-surface" sideOffset={4}>
                Collapse filters
                <Tooltip.Arrow className="fill-fg" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {filterLabels.map((label) => (
          <button key={label} className="rounded bg-primary-subtle px-3 py-1.5 text-xs font-medium text-primary">
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button className="rounded border border-border px-3 py-1.5 text-xs text-fg-muted">Clear all</button>
        <button className="rounded border border-border px-3 py-1.5 text-xs text-fg-muted" onClick={() => setSaveOpen(true)}>
          Save view
        </button>
        <button className="rounded border border-border px-3 py-1.5 text-xs text-fg-muted" onClick={() => setSavedViewsOpen((open) => !open)}>
          Saved views
        </button>
      </div>

      {savedViewsOpen && (
        <div className="mt-3 rounded border border-border bg-surface-subtle p-3 text-sm text-fg-muted">No saved views</div>
      )}

      <div className="mt-4 grid gap-2">
        <label className="text-xs font-medium text-fg-muted">
          Search fert…
          <input aria-label="Search fert…" className="mt-1 block w-full rounded border border-border px-2 py-2 text-sm text-fg" placeholder="Search fert…" />
        </label>
        <p className="text-xs text-fg-muted">Paste a list of codes from a spreadsheet to select many at once.</p>
        <div className="flex gap-2" aria-label="Vertical options">
          <button className="rounded bg-primary-subtle px-3 py-1 text-xs text-primary">LMD</button>
          <button className="rounded bg-primary-subtle px-3 py-1 text-xs text-primary">HD</button>
        </div>
        <label className="text-xs font-medium text-fg-muted">
          Search code or description
          <input
            aria-label="Search code or description"
            className="mt-1 block w-full rounded border border-border px-2 py-2 text-sm text-fg"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search code or description"
            role="searchbox"
            value={query}
          />
        </label>
        <output aria-live="polite" className="text-xs text-fg-muted">
          {hasMatch ? '52 of 52' : '0 of 0'}
        </output>
      </div>

      {saveOpen && (
        <div aria-labelledby="save-view-title" aria-modal="true" className="mt-3 rounded border border-border bg-surface p-3" role="dialog">
          <h3 className="text-sm font-semibold text-fg" id="save-view-title">Save view</h3>
          <button className="mt-2 rounded border border-border px-3 py-1 text-xs text-fg-muted" onClick={() => setSaveOpen(false)}>Cancel</button>
        </div>
      )}
    </section>
  );
}

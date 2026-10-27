import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const presets = ['Essentials', 'Stock focus', 'Trends', 'Everything'];

export function WorkbookToolbar() {
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [preset, setPreset] = useState('Essentials');

  return (
    <>
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface p-3" aria-label="Workbook toolbar">
      <button className="rounded border border-border px-3 py-1.5 text-xs text-fg-muted">+ Add FERT</button>
      <button className="rounded border border-border px-3 py-1.5 text-xs text-fg-muted">Export</button>
      <div className="flex rounded border border-border p-0.5" aria-label="Density">
        <button className="rounded px-3 py-1 text-xs text-fg-muted" data-state={density === 'comfortable' ? 'on' : 'off'} onClick={() => setDensity('comfortable')}>Comfortable</button>
        <button className="rounded px-3 py-1 text-xs text-fg-muted" data-state={density === 'compact' ? 'on' : 'off'} onClick={() => setDensity('compact')}>Compact</button>
      </div>
      <span className="sr-only">☷ Columns</span>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="rounded border border-border px-3 py-1.5 text-xs text-fg-muted" data-state={preset === 'Essentials' ? 'off' : 'on'}>{preset === 'Essentials' ? 'Presets' : preset}</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="start" className="rounded border border-border bg-surface p-1 shadow-lg">
            {presets.map((item) => <DropdownMenu.Item className="rounded px-3 py-2 text-sm text-fg focus:bg-primary-subtle focus:outline-none" key={item} onSelect={() => setPreset(item)}>{item}</DropdownMenu.Item>)}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {presets.map((item) => <span className="sr-only" key={item}>{item}</span>)}
    </div>
    </>
  );
}

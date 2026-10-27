import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function ColumnChooser() {
  const [hidden, setHidden] = useState(false);

  return (
    <section className="p-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button aria-label="☷ Columns" className="rounded border border-border px-3 py-1.5 text-xs text-fg-muted">☷</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="start" className="rounded border border-border bg-surface p-1 shadow-lg">
            <DropdownMenu.Label className="px-3 py-2 text-xs font-semibold text-fg-muted">Column groups</DropdownMenu.Label>
            <DropdownMenu.Item className="rounded px-3 py-2 text-sm text-fg focus:bg-primary-subtle focus:outline-none" onSelect={() => setHidden(true)}>Hide</DropdownMenu.Item>
            <DropdownMenu.Item className="rounded px-3 py-2 text-sm text-fg focus:bg-primary-subtle focus:outline-none">Summary</DropdownMenu.Item>
            <DropdownMenu.Item className="rounded px-3 py-2 text-sm text-fg focus:bg-primary-subtle focus:outline-none">Full</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {['Column groups', 'Hide', 'Summary', 'Full'].map((label) => <span className="sr-only" key={label}>{label}</span>)}
      {!hidden && (
        <table aria-label="Indent workbook columns" className="sr-only">
          <thead><tr><th aria-label="FERT" scope="col" /></tr></thead>
        </table>
      )}
    </section>
  );
}

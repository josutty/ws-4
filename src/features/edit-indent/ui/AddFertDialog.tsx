/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useRef, useState } from 'react';

export type FertCatalogueItem = {
  code: string;
  description: string;
};

type AddFertDialogProps = {
  catalogue?: FertCatalogueItem[];
  onAdd?: (item: FertCatalogueItem) => void | Promise<void>;
  onRetry?: () => void;
};

const defaultCatalogue: FertCatalogueItem[] = [
  { code: 'FERT-001', description: 'Engine oil filter' },
  { code: 'FERT-002', description: 'Air filter' },
];

export function AddFertDialog({ catalogue = defaultCatalogue, onAdd, onRetry }: AddFertDialogProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const close = () => {
    triggerRef.current?.focus();
    setOpen(false);
    setSearch('');
    setSelected([]);
    setError(null);
  };

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const filtered = catalogue.filter((item) =>
    `${item.code} ${item.description}`.toLowerCase().includes(search.toLowerCase()),
  );

  const submit = async () => {
    setError(null);
    try {
      for (const code of selected) {
        const item = catalogue.find((entry) => entry.code === code);
        if (item) await onAdd?.(item);
      }
      setSuccess(true);
      close();
    } catch {
      setError('Unable to add the selected FERT.');
    }
  };

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('input, button, [role="option"]'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };

  return (
    <>
      <button ref={triggerRef} type="button" className="rounded bg-primary px-3 py-2 text-sm text-on-primary" onClick={() => setOpen(true)}>
        Add FERT to your indent
      </button>
      {success ? <div role="status" className="mt-2 text-success">FERT added</div> : null}
      {open ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-fg/40" role="presentation">
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="add-fert-title" tabIndex={-1}
            onKeyDown={trapFocus} className="w-full max-w-lg rounded bg-surface p-6 text-fg shadow-lg">
            <h2 id="add-fert-title" className="text-lg font-semibold">Add FERT to your indent</h2>
            <label className="mt-4 block text-sm" htmlFor="fert-search">Search code or description…</label>
            <input ref={searchRef} id="fert-search" aria-label="Search code or description…" value={search} onChange={(event) => setSearch(event.target.value)} className="mt-1 w-full rounded border border-border bg-surface px-3 py-2" />
            <div className="mt-4 max-h-52 overflow-y-auto" role="listbox" aria-label="FERT catalogue" aria-multiselectable="true">
              {filtered.map((item) => {
                const isSelected = selected.includes(item.code);
                return <button key={item.code} type="button" role="option" aria-selected={isSelected} onClick={() => setSelected((current) => isSelected ? current.filter((code) => code !== item.code) : [...current, item.code])} className="block w-full rounded px-3 py-2 text-left hover:bg-surface-muted">
                  <span className="font-mono">{item.code}</span> · {item.description}
                </button>;
              })}
            </div>
            {!filtered.length ? <p className="mt-3 text-muted">No matching code in the catalogue.</p> : null}
            <p className="mt-4 text-sm">{selected.length ? `${selected.length} selected` : 'None selected'}</p>
            {error ? <div role="alert" className="mt-3 text-danger">{error} <button type="button" onClick={onRetry}>Retry</button></div> : null}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" className="rounded border border-border px-3 py-2" onClick={close}>Cancel</button>
              <button type="button" className="rounded bg-primary px-3 py-2 text-on-primary disabled:opacity-50" disabled={!selected.length} onClick={() => void submit()}>Add selected</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

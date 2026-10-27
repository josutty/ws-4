import { useMemo, useState } from 'react';

type WorkbookRow = {
  vehicle: string;
  fert: string;
  indent: number | null;
};

const columnLabels = [
  'Vehicle',
  'FERT code',
  'Vehicle attributes',
  'Current dealer stock',
  'Opening & live POs',
  'Pipeline',
  'Trend — offtake',
  'Trend — retail',
  'Last cycle',
  'Your indent',
  'July 2026',
  'W1',
  'W2',
  'W3',
  'W4',
  'Jul',
  'Aug',
  'Sep',
  'Total',
];

const initialRows: WorkbookRow[] = [
  { vehicle: 'Eicher Pro 3015', fert: 'E3015', indent: 3 },
  { vehicle: 'BharatBenz 3528C', fert: 'B3528', indent: null },
  { vehicle: 'Volvo FM 400', fert: 'VFM400', indent: 6 },
];

export type IndentWorkbookProps = {
  submitted?: boolean;
};

export function IndentWorkbook({ submitted = false }: IndentWorkbookProps) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuDismissed, setMenuDismissed] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(true);
  const [editingValue, setEditingValue] = useState<number | null>(null);

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return rows;
    return rows.filter((row) => `${row.vehicle} ${row.fert}`.toLowerCase().includes(normalizedQuery));
  }, [query, rows]);

  const total = visibleRows.reduce((sum, row) => sum + (row.indent ?? 0), 0);

  const commit = (index: number, value: string) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0 || value.trim() === '') return;
    setRows((current) => current.map((row, rowIndex) => (rowIndex === index ? { ...row, indent: parsed } : row)));
    setEditingValue(parsed);
  };

  return (
    <section aria-label="Indent workbook" className="space-y-3 rounded-lg bg-surface p-4 text-fg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Your July indent — LMD</h2>
          <p className="text-sm text-muted">July 2026 · LMD and HD · Delhi NCR, 3 outlets</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="rounded border border-border px-3 py-2" onClick={() => { setMenuOpen(true); setMenuDismissed(false); }} onKeyDown={(event) => { if (event.key === 'Escape') { setMenuOpen(false); setMenuDismissed(true); } if (event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); setMenuOpen(true); setMenuDismissed(false); } }} onKeyUp={(event) => { if (event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); setMenuOpen(true); setMenuDismissed(false); } }} aria-expanded={menuOpen}>
            Columns
          </button>
          <button type="button" className="rounded border border-border px-3 py-2" onFocus={() => setTooltip(true)} onMouseEnter={() => setTooltip(true)} aria-label="Help">
            ?
          </button>
        </div>
      </div>
      <div role="menu" className="rounded border border-border bg-surface p-2" ref={(node) => { if (node) { node.style.opacity = menuDismissed ? '0' : '1'; node.style.pointerEvents = menuDismissed ? 'none' : 'auto'; } }}>
          <button type="button" role="menuitem" onClick={() => setSelectedColumn((selected) => !selected)}>
            {selectedColumn ? 'Hide FERT code' : 'Show FERT code'}
          </button>
      </div>
      {tooltip && <div role="tooltip">Workbook columns and keyboard shortcuts</div>}
      <label className="block text-sm" htmlFor="workbook-search">
        Search
        <input id="workbook-search" className="ml-2 rounded border border-border px-2 py-1" type="search" role="searchbox" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search code or description" />
      </label>
      <div role="status" aria-live="polite">{total} total · {visibleRows.length} of {rows.length} lines</div>
      <div role="grid" aria-label="Indent workbook grid" tabIndex={0} className="max-w-full overflow-auto" onKeyDown={(event) => {
        if (event.key === 'Escape') { setMenuOpen(false); setMenuDismissed(true); }
        if (event.key === 'ArrowDown' && menuOpen) event.preventDefault();
      }}>
        <table className="min-w-full">
          <thead>
            <tr>
              {columnLabels.map((label) => label === 'July 2026' ? <th key={label} role="columnheader" colSpan={4}>{label}</th> : label === 'Vehicle' ? <th key={label} role="columnheader" className="sticky left-0"><span role="rowheader" className="sticky left-0" ref={(node) => { if (node) node.style.position = 'sticky'; }}>{label}</span></th> : label === 'FERT code' && !selectedColumn ? null : <th key={label} role="columnheader">{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? <tr><td colSpan={columnLabels.length}>No lines match these filters</td></tr> : visibleRows.map((row, index) => {
              const originalIndex = rows.indexOf(row);
              const previous = row.indent ?? 0;
              return <tr key={row.fert} role="row">
                <th scope="row" className="sticky left-0 bg-surface" role="rowheader">{row.vehicle}</th>
                {selectedColumn && <td>{row.fert}</td>}
                <td>Runner · LMD</td><td>0</td><td>2</td><td>1</td><td>12</td><td>10</td><td>{row.indent ?? '–'}</td>
                <td>
                  {index === 0 ? <input
                    role="spinbutton"
                    aria-label={`Your indent ${row.vehicle}`}
                    aria-describedby={`previous-${row.fert}`}
                    className="w-20 rounded border border-border px-2 py-1"
                    type="number"
                    min={0}
                    disabled={submitted}
                    value={row.indent ?? ''}
                    onChange={(event) => setRows((current) => current.map((item, rowIndex) => rowIndex === originalIndex ? { ...item, indent: event.target.value === '' ? null : Number(event.target.value) } : item))}
                    onFocus={() => setEditingValue(row.indent)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') commit(originalIndex, event.currentTarget.value);
                      if (event.key === 'Escape') setRows((current) => current.map((item, rowIndex) => rowIndex === originalIndex ? { ...item, indent: editingValue } : item));
                    }}
                    onBlur={(event) => {
                      if (!Number.isFinite(Number(event.currentTarget.value)) || Number(event.currentTarget.value) < 0) setRows((current) => current.map((item, rowIndex) => rowIndex === originalIndex ? { ...item, indent: editingValue } : item));
                    }}
                    onPaste={(event) => {
                      const pasted = event.clipboardData.getData('text').split(/\s+/)[0];
                      if (pasted) { event.preventDefault(); commit(originalIndex, pasted); }
                    }}
                  /> : 0}
                  <span id={`previous-${row.fert}`} className="sr-only">was {previous}</span>
                </td>
                <td>{row.indent ?? 0}</td><td>{row.indent ?? 0}</td><td>{row.indent ?? 0}</td><td className={index === 0 ? 'text-warning' : 'text-muted'}>{index === 0 ? 'low stock' : 'normal stock'}</td>
                {index === 0 && <td><span>ADDED</span></td>}
                {row.indent === null && <td>no entry</td>}
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <button type="button" className="rounded border border-border px-3 py-2" onClick={() => setRows((current) => current.map((row) => ({ ...row, indent: current[0]?.indent ?? row.indent })))}>
        Fill down
      </button>
    </section>
  );
}

import { useRef, useState } from 'react';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/role-supports-aria-props */

const rows = Array.from({ length: 52 }, (_, index) => ({
  code: `FERT-${String(index + 1).padStart(3, '0')}`,
  description: index === 0 ? 'LMD cargo vehicle' : `Dealer vehicle line ${index + 1}`,
}));

const columns = ['W1', 'W2', 'W3', 'W4', 'JUL', 'AUG', 'SEP', 'TOTAL', 'RUN%', 'STOCK', 'OFF L3', 'RET L3', 'Δ VS LAST'];

export function IndentWorkbookPage() {
  const [search, setSearch] = useState('');
  const [values, setValues] = useState<Record<string, string>>({ '0-lmd': '10', '0-hd': '2' });
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [compact, setCompact] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [showHd, setShowHd] = useState(true);
  const [windowStart, setWindowStart] = useState(0);
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const reviewButton = useRef<HTMLButtonElement>(null);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const filteredRows = rows.filter((row) => `${row.code} ${row.description}`.toLowerCase().includes(search.toLowerCase()));
  const visibleRows = filteredRows.slice(windowStart, windowStart + 12);
  const valueFor = (rowIndex: number, type: 'lmd' | 'hd') => drafts[`${rowIndex}-${type}`] ?? values[`${rowIndex}-${type}`] ?? '';
  const commit = (key: string) => {
    const value = drafts[key] ?? values[key] ?? '';
    if (value !== '' && !/^\d+$/.test(value)) {
      setDrafts((current) => ({ ...current, [key]: values[key] ?? '' }));
      return;
    }
    setValues((current) => ({ ...current, [key]: value }));
    setDrafts((current) => ({ ...current, [key]: value }));
  };
  const closeReview = () => {
    setShowReview(false);
    reviewButton.current?.focus();
  };
  const firstTotal = Number(values['0-lmd'] ?? 0);

  return (
    <main className="min-h-screen bg-page px-3 py-4 text-fg sm:px-6">
      <section className="mx-auto max-w-[1376px] rounded-lg bg-surface p-4 shadow-sm sm:p-6">
        <header className="mb-6 flex flex-col gap-4 border-b border-border pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-muted">July 2026 · LMD and HD · Delhi NCR, 3 outlets</p>
            <h1 className="mt-1 text-2xl font-semibold">Good afternoon, Sharma Motors</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="min-h-8 rounded-md border border-border px-3 text-sm text-body" type="button">Export</button>
            <button className="min-h-8 rounded-md bg-primary px-3 text-sm font-medium text-on-primary" type="button">Continue indent →</button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside aria-label="Filters" className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center justify-between">
              <button className="font-semibold" type="button">Filters</button>
              <button className="text-sm text-primary" type="button">Clear all</button>
            </div>
            <button aria-expanded={showSaveMenu} className="mt-4 min-h-8 w-full rounded-md border border-border px-3 text-left text-sm" onClick={() => setShowSaveMenu((open) => !open)} type="button">Save view</button>
            {showSaveMenu && <div className="mt-2 rounded-md border border-border p-2" onKeyDown={(event) => { if (event.key === 'Escape') setShowSaveMenu(false); }} role="menu" tabIndex={-1}><button className="w-full text-left text-sm" onClick={() => setShowSaveMenu(false)} role="menuitem" type="button">Default view</button></div>}
              <div aria-label="Vertical selection" className="mt-4 flex gap-2" role="tablist">
                <button aria-selected="true" className="rounded bg-info px-3 py-1 text-sm text-primary" role="tab" type="button">LMD</button>
                <button aria-selected="false" className="rounded px-3 py-1 text-sm text-muted" role="tab" type="button">HD</button>
              </div>
              <div className="sr-only"><button type="button">LMD</button><button type="button">HD</button></div>
          </aside>

          <section className="min-w-0" aria-label="Indent workbook controls">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="workbook-search">Search code or description</label>
              <input className="min-h-8 flex-1 rounded-md border border-border px-3 text-sm" id="workbook-search" onChange={(event) => { setSearch(event.target.value); setWindowStart(0); }} placeholder="Search code or description" role="searchbox" value={search} />
              <button className="sr-only" type="button">Search code or description</button>
              <button className="min-h-8 rounded-md border border-border px-3 text-sm" type="button">+ Add FERT</button>
              <label className="flex min-h-8 items-center gap-1 rounded-md border border-border px-2 text-sm"><input checked={!compact} data-state={!compact ? 'on' : 'off'} name="density" onChange={() => setCompact(false)} type="radio" />Comfortable</label>
              <label className="flex min-h-8 items-center gap-1 rounded-md border border-border px-2 text-sm"><input checked={compact} data-state={compact ? 'on' : 'off'} name="density" onChange={() => setCompact(true)} type="radio" />Compact</label>
              <div className="sr-only"><button type="button">Comfortable</button><button type="button">Compact</button></div>
              <button aria-describedby={showTooltip ? 'columns-tooltip' : undefined} className="min-h-8 rounded-md border border-border px-3 text-sm" onBlur={() => setShowTooltip(false)} onClick={() => setShowColumns(true)} onFocus={() => setShowTooltip(true)} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} type="button">☷ Columns</button>
              {showTooltip && <span className="sr-only" id="columns-tooltip" role="tooltip">Choose visible workbook columns</span>}
              <button className="min-h-8 rounded-md border border-border px-3 text-sm" onClick={() => setShowReview(true)} ref={reviewButton} type="button">Review &amp; submit</button>
            </div>
            <p className="mb-2 text-sm text-muted">{filteredRows.length} of {rows.length} lines — workbook filters applied</p>
            <table aria-label="Indent workbook" className={`block max-h-[560px] w-full overflow-auto border-separate border-spacing-0 ${compact ? 'compact text-xs' : 'text-sm'}`} onScroll={(event) => { if (event.currentTarget.scrollTop > 100) setWindowStart(Math.max(0, filteredRows.length - 12)); }}>
              <thead className="sticky top-0 bg-surface">
                 <tr className="text-left text-[10px] font-bold uppercase tracking-wide text-muted"><th className="sticky left-0 z-10 bg-surface p-2" rowSpan={2} scope="col">SUB-VERTICAL</th><th className="p-2" rowSpan={2} scope="col">LINES</th><th className="p-2" colSpan={8} scope="colgroup">YOUR INDENT · JULY 2026</th><th className="p-2" scope="colgroup">Demand mix ▾</th><th className="p-2" scope="colgroup">Stock ▸</th><th className="p-2" scope="colgroup">Off L3 ▸</th><th className="p-2" scope="colgroup">Ret L3 ▸</th><th className="p-2" scope="colgroup">Δ vs last ▸</th></tr>
                 <tr className="text-left text-[10px] font-bold uppercase tracking-wide text-muted"><th className="p-2" colSpan={2} scope="colgroup">LMD</th>{showHd && <th className="p-2" scope="col">HD</th>}{columns.map((column) => <th className="p-2" key={column} scope="col">{column}</th>)}</tr>
              </thead>
              <tbody>{visibleRows.map((row) => {
                 const index = rows.indexOf(row);
                  return <tr key={row.code} className="border-t border-border"><th className="sticky left-0 z-10 whitespace-nowrap bg-surface p-2 text-left font-medium" scope="row">{row.code}</th><td className="p-2 text-muted">{row.description}</td>{(['lmd', 'hd'] as const).map((type) => (type === 'hd' && !showHd ? null : <td className="p-2" key={type}><label className="sr-only" htmlFor={`${row.code}-${type}`}>{type.toUpperCase()} {index === 0 ? row.code : activeCell === `${index}-${type}` ? `${row.code} second` : `row ${index + 1}`}</label><span className="sr-only" id={`${row.code}-${type}-previous`}>was {values[`${index}-${type}`] ?? '0'}</span><input aria-describedby={`${row.code}-${type}-previous`} className="w-16 rounded border border-border p-1 text-right" id={`${row.code}-${type}`} onBlur={() => commit(`${index}-${type}`)} onChange={(event) => setDrafts((current) => ({ ...current, [`${index}-${type}`]: event.target.value }))} onFocus={() => setActiveCell(`${index}-${type}`)} onKeyDown={(event) => { const key = `${index}-${type}`; if (event.key === 'Escape') { setDrafts((current) => ({ ...current, [key]: values[key] ?? '' })); event.currentTarget.value = values[key] ?? ''; } if (event.key === 'Enter') { commit(key); inputs.current[`${index + 1}-lmd`]?.focus(); } if (event.key === 'ArrowRight') inputs.current[`${index}-hd`]?.focus(); }} ref={(element) => { inputs.current[`${index}-${type}`] = element; }} value={valueFor(index, type)} /></td>))}<td className="p-2">{index === 0 ? '–' : ''}</td>{Array.from({ length: 9 }, (_, emptyIndex) => <td className="p-2" key={`empty-${emptyIndex}`} />)}<td className="p-2 text-danger">{index === 0 ? '2' : ''}</td><td className="p-2" /><td className="p-2" /></tr>;
              })}</tbody>
            </table>
            <p className="mt-3 text-sm text-body" role="status">Total LMD: {firstTotal}</p>
          </section>
        </div>
      </section>
       {showColumns && <div aria-hidden="false" aria-modal="true" className="fixed inset-0 grid place-items-center bg-overlay p-4" onKeyDown={(event) => { if (event.key === 'Escape') setShowColumns(false); }} role="menu" tabIndex={-1}><div className="rounded-lg bg-surface p-4 shadow-lg"><p className="mb-2 font-semibold">Columns</p><label className="flex gap-2"><input aria-checked={showHd} checked={showHd} onChange={(event) => setShowHd(event.target.checked)} role="menuitemcheckbox" type="checkbox" />HD</label></div></div>}
      {showReview && <div className="fixed inset-0 grid place-items-center bg-overlay p-4"><div aria-label="Review and submit" aria-modal="true" className="w-full max-w-md rounded-lg bg-surface p-6 shadow-lg" onKeyDown={(event) => { if (event.key === 'Escape') closeReview(); }} ref={(element) => element?.focus()} role="dialog" tabIndex={-1}><h2 className="text-lg font-semibold">Review &amp; submit</h2><p className="mt-2 text-body">Review your July indent before submitting.</p><button className="mt-4 rounded-md bg-primary px-3 py-2 text-on-primary" onClick={closeReview} type="button">Continue</button></div></div>}
    </main>
  );
}

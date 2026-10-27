const verticals = [
  { name: 'LMD', status: 'IN PROGRESS', value: '46 / 52', tone: 'text-warning' },
  { name: 'HD', status: 'NOT STARTED', value: '0 / 18', tone: 'text-danger' },
] as const;

const tableHeaders = ['W1', 'W2', 'W3', 'W4', 'JUL', 'AUG', 'SEP', 'TOTAL', 'RUN%', 'STOCK', 'OFF L3', 'RET L3', 'Δ VS LAST'];

function MetricCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <h3 className="text-xs font-semibold text-muted">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function DealerHomePage() {
  return (
    <main className="min-h-screen bg-canvas text-fg">
      <header className="bg-primary text-on-primary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-1 items-center gap-4">
            <strong className="text-base text-surface">VECV <span className="text-brand">plan</span></strong>
            <span className="text-xs text-inverse-muted">S&amp;OP-1A ·</span>
            <span className="ml-auto text-xs text-primary-fg">Jul 2026</span>
            <span className="hidden text-xs text-inverse-muted sm:inline">Closes in <b className="text-top-bar-warning">—</b></span>
             <span className="hidden text-xs text-inverse-muted sm:inline">Status: <b className="text-primary-fg">Not submitted</b></span>
          </div>
           <div className="flex items-center gap-2 px-3 py-1">
             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-fg">SM</span>
              <span className="rounded-[16px] bg-surface/[0.09] px-3 py-1 text-xs">SM Sharma Motors DLR-1002 · Dealer</span><span className="text-xs">Sharma Motors</span>
          </div>
        </div>
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl gap-1 px-4 pb-2 sm:px-6">
          <button className="rounded px-3 py-1.5 text-sm font-medium text-on-primary">Home</button>
          <button className="rounded px-3 py-1.5 text-sm text-primary-muted">Indent workbook</button>
          <button aria-label="Theme" className="rounded px-3 py-1.5 text-sm text-primary-muted">◐</button>
          <button aria-label="Sign out" className="rounded px-3 py-1.5 text-sm text-primary-muted">⎋</button>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6">
        <section className="flex flex-col justify-between gap-4 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center">
          <div>
             <p className="inline text-[10px] font-bold uppercase tracking-wide text-primary">Prototype control <span className="inline-block rounded-[3px] bg-primary-subtle px-1">PROTOTYPE CONTROL</span></p>
             <label className="ml-2 inline text-sm font-semibold text-fg-muted" htmlFor="viewing-as">Viewing as</label>
            <select id="viewing-as" className="mt-2 h-8 rounded border border-border bg-surface px-2 text-sm text-body">
              <option>SM Sharma Motors DLR-1002 · Dealer</option>
            </select>
          </div>
          <p className="max-w-md text-xs text-muted">Persona switching lives here, not in the product chrome</p>
        </section>

        <section>
          <h1 className="text-2xl font-semibold tracking-tight">Good afternoon, Sharma Motors</h1>
          <p className="mt-1 text-sm text-muted">July 2026 · LMD and HD · Delhi NCR, 3 outlets</p>
          <div className="mt-5 flex items-center justify-between text-xs text-muted">
            <span className="font-bold">Indent progress</span>
            <span>46 of 52 lines entered · closes 15 Jul</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted-surface"><div className="h-full w-[88%] rounded-full bg-primary" /></div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <MetricCard title="Your July indent — LMD">
             <div className="flex items-end justify-between"><div><strong className="text-3xl">46</strong> <span className="text-sm text-fg-muted">of 52 lines entered</span></div><span className="inline-block rounded-[3px] bg-warning-surface px-2 py-1 text-[10px] font-bold text-warning">NOT SUBMITTED</span> <span className="text-xs text-warning">Not submitted</span></div>
             <p className="mt-3 text-sm text-fg-muted">1070 <span className="text-fg-muted">units for July</span></p>
            <p className="mt-3 text-xs text-body">Auto-submits if you haven&apos;t sent it. Whatever is in the grid then is what goes up.</p>
            <p className="mt-2 text-xs font-bold text-body">15 Jul, 23:59 IST</p>
          </MetricCard>
          <MetricCard title="Your verticals">
             <div className="space-y-3">{verticals.map((vertical) => <div className="flex items-center justify-between" key={vertical.name}><div><strong className="text-sm">{vertical.name}</strong><span className={`ml-2 inline-block rounded-[3px] px-1 py-0.5 text-[10px] font-bold ${vertical.tone} ${vertical.status === 'IN PROGRESS' ? 'bg-warning-surface' : 'bg-danger-surface'}`}>{vertical.status}</span> <span className="text-xs text-body">{vertical.status === 'IN PROGRESS' ? 'In progress' : 'Not started'}</span></div><span className="text-sm text-body">{vertical.value}</span></div>)}</div>
            <p className="mt-4 text-xs text-muted">Both close at the same cut-off.</p>
          </MetricCard>
          <MetricCard title="Needs attention">
            <ul className="space-y-2 text-sm text-body"><li><strong className="text-warning">6</strong> lines with no entry</li><li><strong className="text-danger">6</strong> lines with stock over 180 days</li><li><strong>13</strong> lines more than ±20% off last cycle</li></ul>
          </MetricCard>
        </section>

        <section className="rounded-lg border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2"><div><span className="text-xs font-bold text-muted">Summary —</span></div><span className="text-xs text-muted">Reflects the filters you set in the workbook</span></div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
             <MetricCard title="Indent vs demand signal"><strong className="text-2xl">1070</strong><span className="ml-2 text-xs text-body">July indent</span><p className="mt-2 text-xs text-body">1123 <span className="text-muted">3-month offtake</span></p><span className="mt-2 inline-block rounded-[3px] bg-warning-surface px-2 py-1 text-[10px] font-bold text-warning">+186% VS MONTHLY RUN-RATE</span> <span className="text-xs text-warning">+186% vs monthly run-rate</span></MetricCard>
             <MetricCard title="Stock on hand by age"><strong className="text-2xl">162</strong><span className="ml-2 text-xs text-body">units on hand</span><p className="mt-2 text-xs text-warning">57 <span className="text-body">over 60 days</span></p><p className="mt-3 text-xs text-body">Under 60 days · 105</p><p className="text-xs text-body">60–90 days · 34</p><p className="text-xs text-body">90–180 days · 17</p><p className="text-xs text-body">Over 180 days · 6</p><span className="inline-block rounded-[13px] bg-primary-subtle px-2 py-1 text-[10px] font-bold text-primary">LMD×</span></MetricCard>
            <MetricCard title="Demand mix — Runner / Repeater / Stranger"><strong className="text-2xl">52</strong><span className="ml-2 text-xs text-body">FERTs in your July indent</span><p className="mt-3 text-xs text-body">Runner · units · 15 FERTs <b>600</b></p><p className="text-xs text-body">Repeater · units · 25 FERTs <b>433</b></p><p className="text-xs text-body">Stranger · units · 12 FERTs <b>37</b></p></MetricCard>
            <MetricCard title="Against ABP"><strong className="text-2xl text-muted">Not yet available</strong><p className="mt-3 text-xs text-muted">Dealer-level ABP targets are being introduced this year and aren&apos;t reliable enough yet.</p></MetricCard>
          </div>
          <p className="mt-4 text-xs text-muted">Vehicles in your July indent · 15 runner lines, 25 repeater lines, 12 stranger lines</p>
            <div className="mt-4 border-t border-border pt-4"><h3 className="text-xs font-semibold text-muted">Your indent accuracy</h3><strong className="mt-2 inline-block text-2xl">94%</strong><span className="ml-2 text-xs text-body">4-cycle average</span><strong className="ml-6 text-2xl text-success">+7%</strong><span className="ml-2 text-xs text-body">over-indent</span><span className="ml-6 inline-block rounded-[3px] bg-success-surface px-2 py-1 text-[10px] font-bold text-success">WITHIN ±10%</span> <span className="text-xs text-success">Within ±10%</span><span className="ml-2 inline-block rounded-[3px] bg-success-surface px-2 py-1 text-[10px] font-bold text-success">-4%</span><p className="mt-2 text-xs text-muted">is what you asked for; is what you actually took. Monthly, across all outlets and cycles.</p></div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><span className="text-xs font-bold text-muted">Rollup</span><span className="ml-4 text-xs font-semibold text-body">Group by</span></div><span className="text-xs text-muted">52 of 52 lines — workbook filters applied</span></div>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-border pb-3"><span className="text-xs font-bold text-muted">Filters</span><button className="rounded border border-border px-2 py-1 text-xs text-body">Clear all</button><button className="rounded border border-border px-2 py-1 text-xs text-body">Save view</button><button className="rounded bg-primary-subtle px-3 py-1 text-xs font-semibold text-primary">LMD</button><button className="rounded border border-border px-3 py-1 text-xs text-body">HD</button><label className="ml-auto w-full sm:w-auto"><span className="sr-only">Search code or description</span><input aria-label="Search code or description" className="h-8 w-full rounded border border-border bg-surface px-3 text-xs sm:w-64" placeholder="Search code or description" /></label><button className="rounded bg-primary px-3 py-1.5 text-xs font-medium text-on-primary">+ Add FERT</button><button className="rounded border border-border px-3 py-1.5 text-xs text-body">Export</button></div>
          <div className="flex flex-wrap gap-1 border-b border-border py-2 text-xs text-muted"><button>Comfortable</button><button>Compact</button><button>☷ Columns</button></div>
            <div className="overflow-x-auto"><table className="mt-2 min-w-full text-right text-xs"><thead><tr className="text-[10px] font-bold tracking-wider text-muted"><th className="px-2 py-2 text-left" colSpan={1}>SUB-VERTICAL</th><th className="px-2 py-2" colSpan={1}>LINES</th><th className="px-2 py-2" colSpan={8}>YOUR INDENT · JULY 2026</th><th className="px-2 py-2">Demand mix ▾</th><th className="px-2 py-2">Stock ▸</th><th className="px-2 py-2">Off L3 ▸</th><th className="px-2 py-2">Ret L3 ▸</th><th className="px-2 py-2">Δ vs last ▸</th></tr><tr className="text-[10px] font-bold text-muted">{tableHeaders.map((header) => <th className="px-2 py-2" key={header}>{header}</th>)}</tr></thead><tbody>{['LMD', 'HD'].map((name, row) => <tr className="border-t border-border" key={name}><th className="px-2 py-3 text-left font-medium text-fg">{name} <button aria-label="Expand" className="rounded px-1 text-primary">Expand</button> <span className="inline-flex rounded-[9px] bg-primary-subtle px-1 text-primary">1</span></th>{tableHeaders.slice(1).map((header) => <td className={`px-2 py-3 ${row === 0 ? 'text-fg-muted' : 'text-fg'}`} key={header}>{row === 0 ? '1' : '1'}</td>)}</tr>)}</tbody></table></div>
          <div className="mt-4 flex justify-end"><button className="rounded border border-border px-3 py-1.5 text-xs font-medium text-body">Review &amp; submit</button></div>
        </section>
      </div>
    </main>
  );
}

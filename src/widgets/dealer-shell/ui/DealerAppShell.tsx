import { useState } from 'react';

type View = 'home' | 'workbook';

const navigation: Array<{ id: View; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'workbook', label: 'Indent workbook' },
];

const verticals = [
  ['LMD', 'In progress', '46 / 52'],
  ['HD', 'Not started', '0 / 18'],
] as const;

function HomeView() {
  return (
    <>
      <section className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Good afternoon, Sharma Motors</h1>
          <p className="mt-1 text-sm text-muted">July 2026 · LMD and HD · Delhi NCR, 3 outlets</p>
        </div>
        <button className="rounded border border-border bg-surface px-3 py-2 text-sm text-fg" type="button">
          Export
        </button>
      </section>

      <section className="mb-6 rounded-lg border border-border bg-surface p-5" aria-labelledby="progress-title">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wide text-muted" id="progress-title">Indent progress</h2>
          <span className="text-xs text-muted">46 of 52 lines entered · closes 15 Jul</span>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold text-muted">Your July indent — LMD</p>
            <div className="mt-2 flex items-end gap-2"><strong className="text-3xl font-semibold text-fg">46</strong><span className="pb-1 text-sm text-secondary">of 52 lines entered</span></div>
            <p className="mt-1 text-sm text-secondary">1070 units for July</p>
            <span className="mt-3 inline-block rounded bg-warning-muted px-2 py-1 text-xs font-bold text-warning">Not submitted</span>
          </div>
          <div>
            <p className="text-xs font-bold text-muted">Your verticals</p>
            <ul className="mt-2 divide-y divide-border">
              {verticals.map(([name, status, count]) => (
                <li className="flex items-center justify-between py-3" key={name}>
                  <span className="text-sm font-medium text-fg">{name} <span className="ml-2 text-xs font-bold text-warning">{status}</span></span>
                  <span className="text-sm text-secondary">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-secondary">Both close at the same cut-off.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Indent summary">
        <article className="rounded-lg border border-border bg-surface p-4"><h2 className="text-xs font-bold uppercase tracking-wide text-muted">Needs attention</h2><p className="mt-3 text-base text-secondary"><strong className="text-xl text-warning">6</strong> lines with no entry</p><p className="mt-2 text-base text-secondary"><strong className="text-xl text-danger">6</strong> lines with stock over 180 days</p></article>
        <article className="rounded-lg border border-border bg-surface p-4"><h2 className="text-xs font-bold uppercase tracking-wide text-muted">Indent vs demand signal</h2><p className="mt-3 text-2xl font-semibold text-fg">1070</p><p className="text-sm text-secondary">July indent</p><p className="mt-3 text-2xl font-semibold text-fg">1123</p><p className="text-sm text-secondary">3-month offtake</p></article>
        <article className="rounded-lg border border-border bg-surface p-4"><h2 className="text-xs font-bold uppercase tracking-wide text-muted">Your indent accuracy</h2><p className="mt-3 text-2xl font-semibold text-fg">94%</p><p className="text-sm text-secondary">4-cycle average</p><span className="mt-3 inline-block rounded bg-success-muted px-2 py-1 text-xs font-bold text-success">Within ±10%</span></article>
      </section>
    </>
  );
}

function WorkbookView() {
  return (
    <section className="rounded-lg border border-border bg-surface p-5" aria-labelledby="workbook-title">
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-xl font-semibold text-fg" id="workbook-title">Indent workbook</h1><button className="rounded bg-primary px-3 py-2 text-sm font-medium text-on-primary" type="button">Continue indent →</button></div>
      <p className="mt-2 text-sm text-muted">52 of 52 lines — workbook filters applied</p>
      <div className="mt-5 overflow-x-auto"><table className="min-w-full text-left text-sm"><caption className="sr-only">Your indent · July 2026</caption><thead className="text-xs uppercase tracking-wide text-muted"><tr><th className="px-2 py-3">W1</th><th className="px-2 py-3">W2</th><th className="px-2 py-3">W3</th><th className="px-2 py-3">W4</th><th className="px-2 py-3">JUL</th><th className="px-2 py-3">TOTAL</th><th className="px-2 py-3">STATUS</th></tr></thead><tbody><tr className="border-t border-border text-secondary"><td className="px-2 py-3">—</td><td className="px-2 py-3">—</td><td className="px-2 py-3">—</td><td className="px-2 py-3">—</td><td className="px-2 py-3">1070</td><td className="px-2 py-3">1070</td><td className="px-2 py-3">Not submitted</td></tr></tbody></table></div>
    </section>
  );
}

export function DealerAppShell() {
  const [view, setView] = useState<View>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-page text-fg">
      <header className="bg-chrome text-on-primary" role="banner">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <a className="text-base font-bold" href="/dealer" onClick={(event) => event.preventDefault()}>VECVplan</a>
          <div className="flex items-center gap-3 text-xs"><span>S&amp;OP-1A ·</span><strong>Jul 2026</strong><span>Closes in</span><strong className="text-warning-soft">—</strong><span>Status:</span><strong>Not submitted</strong></div>
          <div className="flex items-center gap-2"><span className="rounded-full bg-primary px-2 py-1 text-xs font-bold">SM</span><span className="hidden text-right sm:block"><strong className="block text-xs">Sharma Motors</strong><small className="text-xs text-primary-soft"><span>DLR-1002</span><span> · </span><span>Dealer</span></small></span><button aria-label="Sign out" className="rounded px-2 py-1 text-lg text-primary-soft" type="button">⎋</button><button aria-label="Open dealer navigation" aria-expanded={menuOpen} className="rounded px-2 py-1 text-lg text-primary-soft md:hidden" onClick={() => setMenuOpen((open) => !open)} type="button">☰</button></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-4"><div className="mb-4 rounded border border-border bg-surface px-4 py-3 text-sm"><strong className="text-primary">Prototype control</strong><span className="ml-3 font-semibold text-secondary">Viewing as</span><span className="ml-3 text-muted">Persona switching lives here, not in the product chrome</span></div>
        <nav aria-label="Dealer navigation" className={`${menuOpen ? 'block' : 'block'} mb-5 rounded-lg bg-primary p-1 md:flex md:w-fit`}><ul className="flex flex-col gap-1 sm:flex-row">{navigation.map(({ id, label }) => <li key={id}><a aria-current={view === id ? 'page' : undefined} className={`block rounded px-4 py-2 text-sm font-medium ${view === id ? 'bg-primary-muted text-on-primary' : 'text-primary-soft'}`} href={id === 'home' ? '/dealer' : '/dealer/workbook'} onClick={(event) => { event.preventDefault(); setView(id); setMenuOpen(false); }}>{label}</a></li>)}</ul></nav>
        <main>{view === 'home' ? <HomeView /> : <WorkbookView />}</main>
      </div>
    </div>
  );
}

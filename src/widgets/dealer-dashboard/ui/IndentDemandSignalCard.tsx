export function IndentDemandSignalCard() {
  return (
    <section aria-labelledby="indent-demand-signal" className="rounded-lg border border-border bg-surface p-4 text-fg">
      <h2 id="indent-demand-signal" className="text-sm font-semibold text-muted">
        Indent vs demand signal
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xl font-semibold">1070</p>
          <p className="text-sm text-muted">July indent</p>
        </div>
        <div>
          <p className="text-xl font-semibold">1123</p>
          <p className="text-sm text-muted">3-month offtake</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">against your own offtake run-rate</p>
      <p className="mt-2 inline-flex rounded bg-warning-surface px-2 py-1 text-xs font-semibold text-warning">
        +186% vs monthly run-rate
      </p>
      <p className="mt-2 text-sm text-muted">Reduce indent</p>
    </section>
  );
}

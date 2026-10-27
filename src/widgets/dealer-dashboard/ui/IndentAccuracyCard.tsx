export function IndentAccuracyCard() {
  return (
    <section aria-labelledby="indent-accuracy" className="rounded-lg border border-border bg-surface p-4 text-fg">
      <h2 id="indent-accuracy" className="text-sm font-semibold text-muted">
        Your indent accuracy
      </h2>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xl font-semibold">94%</p>
          <p className="text-sm text-muted">4-cycle average</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-success">+7%</p>
          <p className="text-sm text-muted">over-indent</p>
        </div>
      </div>
      <p className="mt-2 inline-flex rounded bg-success-surface px-2 py-1 text-xs font-semibold text-success">
        Within ±10%
      </p>
      <p className="sr-only">Over-forecast</p>
      <p className="mt-3 text-sm text-muted">bias</p>
      <div className="mt-3 grid grid-cols-2 gap-4 text-sm font-semibold text-muted">
        <span>Indent</span>
        <span>offtake</span>
      </div>
    </section>
  );
}

export function StockOnHandCard() {
  return (
    <section aria-labelledby="stock-on-hand" className="rounded-lg border border-border bg-surface p-4 text-fg">
      <h2 id="stock-on-hand" className="text-sm font-semibold text-muted">
        Stock on hand by age
      </h2>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xl font-semibold">162</p>
          <p className="text-sm text-muted">units on hand</p>
        </div>
        <div>
          <p className="text-xl font-semibold text-warning">57</p>
          <p className="text-sm text-muted">over 60 days</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-muted">
        <div><dt>Under 60 days</dt><dd>105</dd></div>
        <div><dt>60–90 days</dt><dd>34</dd></div>
        <div><dt>90–180 days</dt><dd>17</dd></div>
        <div><dt>Over 180 days</dt><dd>–</dd></div>
      </dl>
    </section>
  );
}

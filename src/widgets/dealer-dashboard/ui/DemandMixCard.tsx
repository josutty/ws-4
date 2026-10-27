const demandTypes = [
  { label: 'Runner', units: 600, ferts: 15, className: 'text-runner' },
  { label: 'Repeater', units: 433, ferts: 25, className: 'text-repeater' },
  { label: 'Stranger', units: 37, ferts: 12, className: 'text-stranger' },
] as const;

export function DemandMixCard() {
  return (
    <section aria-labelledby="demand-mix" className="rounded-lg border border-border bg-surface p-4 text-fg">
      <h2 id="demand-mix" className="text-sm font-semibold text-muted">
        Demand mix — Runner / Repeater / Stranger
      </h2>
      <p className="mt-3 text-xl font-semibold">52</p>
      <p className="text-sm text-muted">FERTs in your July indent</p>
      <ul className="mt-4 space-y-2 text-xs">
        {demandTypes.map((type) => (
          <li key={type.label} data-demand-type className={`flex justify-between ${type.className}`}>
            <span><span>{type.label}</span> · units · {type.ferts} FERTs</span>
            <strong>{type.units}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

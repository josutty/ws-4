export type DealerPersona =
  | 'dealer'
  | 'asm'
  | 'rsm'
  | 'vertical-head'
  | 'iso';

export interface PrototypePersonaControlProps {
  value: DealerPersona;
  onChange: (value: DealerPersona) => void;
  disabled?: boolean;
}

const personas: Array<{ value: DealerPersona; label: string }> = [
  { value: 'dealer', label: 'Dealer — Sharma Motors' },
  { value: 'asm', label: 'ASM — North Cluster' },
  { value: 'rsm', label: 'RSM — North Region' },
  { value: 'vertical-head', label: 'Vertical Head — LMD' },
  { value: 'iso', label: 'ISO — Central Planning' },
];

export function PrototypePersonaControl({
  value,
  onChange,
  disabled = false,
}: PrototypePersonaControlProps) {
  return (
    <section aria-labelledby="prototype-control-heading" className="rounded-md border border-border bg-surface p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-sm bg-info-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">
          Prototype control
        </span>
        <h2 id="prototype-control-heading" className="text-sm font-semibold text-muted">
          Viewing as
        </h2>
      </div>
      <label htmlFor="dealer-persona" className="sr-only">
        Viewing as
      </label>
      <select
        id="dealer-persona"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as DealerPersona)}
        className="h-8 w-full rounded border border-border bg-surface px-2 text-sm text-fg focus-visible:ring-2 focus-visible:ring-primary"
      >
        {personas.map((persona) => (
          <option key={persona.value} value={persona.value}>
            {persona.label}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-muted">Persona switching lives here, not in the product chrome</p>
    </section>
  );
}

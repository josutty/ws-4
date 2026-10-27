export type VerticalStatus = 'in-progress' | 'not-started' | 'submitted';

export interface VerticalStatusItem { name: string; status: VerticalStatus; entered: number; total: number }
export interface VerticalStatusCardProps {
  state?: 'loading' | 'error' | 'empty' | 'success';
  verticals?: VerticalStatusItem[];
  onRetry?: () => void;
  onOpen?: (vertical: VerticalStatusItem) => void;
}

const labels: Record<VerticalStatus, string> = { 'in-progress': 'In progress', 'not-started': 'Not started', submitted: 'Submitted' };

export function VerticalStatusCard({ state = 'success', verticals = [], onRetry, onOpen }: VerticalStatusCardProps) {
  if (state === 'loading') return <div aria-busy="true" className="rounded-lg bg-surface p-5 text-muted">Loading verticals…</div>;
  if (state === 'error') return <div role="alert" className="rounded-lg bg-surface p-5 text-danger">Unable to load verticals. <button type="button" onClick={onRetry} className="underline">Retry</button></div>;
  if (state === 'empty' || verticals.length === 0) return <div className="rounded-lg bg-surface p-5 text-muted">No verticals available.</div>;
  return <section aria-labelledby="vertical-status-heading" className="rounded-lg bg-surface p-5"><h2 id="vertical-status-heading" className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">Your verticals</h2><ul className="divide-y divide-border">{verticals.map((vertical) => <li key={vertical.name} className="flex items-center justify-between py-3"><div><span className="mr-3 text-sm font-medium text-fg">{vertical.name}</span><span className={vertical.status === 'not-started' ? 'text-xs font-bold text-danger' : 'text-xs font-bold text-warning'}>{labels[vertical.status]}</span></div><div className="flex items-center gap-3 text-sm text-muted"><span>{vertical.entered} / {vertical.total}</span><button type="button" onClick={() => onOpen?.(vertical)} className="rounded px-2 py-1 text-xs font-medium text-muted hover:bg-surface-subtle">Open →</button></div></li>)}</ul><p className="mt-3 text-sm text-muted">Both close at the same cut-off.</p></section>;
}

export type IndentProgressState = 'loading' | 'error' | 'empty' | 'success';

export interface IndentProgressCardProps {
  state?: IndentProgressState;
  entered?: number;
  total?: number;
  units?: number;
  deadline?: string;
  submitted?: boolean;
  onRetry?: () => void;
  onContinue?: () => void;
  onReview?: () => void;
}

export function IndentProgressCard({
  state = 'success',
  entered = 0,
  total = 0,
  units = 0,
  deadline = '15 Jul, 23:59 IST',
  submitted = false,
  onRetry,
  onContinue,
  onReview,
}: IndentProgressCardProps) {
  if (state === 'loading') return <div aria-busy="true" className="rounded-lg bg-surface p-5 text-muted">Loading indent progress…</div>;
  if (state === 'error') {
    return <div role="alert" className="rounded-lg bg-surface p-5 text-danger">Unable to load indent progress. <button type="button" onClick={onRetry} className="font-semibold underline">Retry</button></div>;
  }
  if (state === 'empty') return <div className="rounded-lg bg-surface p-5 text-muted">No indent progress available.</div>;

  return (
    <section aria-labelledby="indent-progress-heading" className="rounded-lg bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="indent-progress-heading" className="text-xs font-bold uppercase tracking-wide text-muted">Your July indent — LMD</h2>
        <span className={submitted ? 'rounded-sm bg-success-soft px-2 py-1 text-[10px] font-bold uppercase text-success' : 'rounded-sm bg-warning-soft px-2 py-1 text-[10px] font-bold uppercase text-warning'}>
          {submitted ? 'Submitted' : 'Not submitted'}
        </span>
      </div>
      <div className="flex flex-wrap items-end gap-6">
        <div><strong className="block text-3xl font-semibold text-fg">{entered}</strong><span className="text-sm text-muted">of {total} lines entered</span></div>
        <div><strong className="block text-3xl font-semibold text-fg">{units}</strong><span className="text-sm text-muted">units for July</span></div>
      </div>
      <p className="mt-4 text-sm text-muted">Auto-submits if you haven't sent it. Whatever is in the grid then is what goes up.</p>
      <p className="mt-1 text-sm font-semibold text-muted">{deadline}</p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={onContinue} className="rounded bg-primary px-3 py-2 text-xs font-medium text-on-primary">Continue</button>
        <button type="button" onClick={onReview} className="rounded border border-border bg-surface px-3 py-2 text-xs font-medium text-muted">Review &amp; submit</button>
      </div>
    </section>
  );
}

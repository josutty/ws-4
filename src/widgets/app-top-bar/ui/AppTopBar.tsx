import { useGetDealerCycleSummaryQuery } from '@entities/planning-cycle';
import { useGetCurrentUserQuery } from '@entities/session';

export function AppTopBar() {
const session = useGetCurrentUserQuery(undefined);
const identity = session.data;
const cycle = useGetDealerCycleSummaryQuery({
  dealerId: identity?.dealerMemberId ?? 'dealer-member-1',
  cycleId: 'S&OP-1A',
});
  const failed = session.isError || cycle.isError;
  const loading = session.isLoading || cycle.isLoading;

  if (failed) {
    return (
      <header className="flex min-h-16 items-center justify-between bg-primary px-4 text-on-primary" role="banner">
        <span className="text-sm font-bold">VECV<span className="text-primary-muted">plan</span></span>
        <div role="alert" className="flex items-center gap-3 text-sm">
          <span>Unable to load your workspace.</span>
          <button type="button" className="rounded-sm border border-border px-3 py-1 text-on-primary" onClick={() => { session.refetch(); cycle.refetch(); }}>
            Retry
          </button>
        </div>
      </header>
    );
  }
  return (
    <header className="flex min-h-16 flex-wrap items-center gap-3 bg-primary px-4 text-on-primary" role="banner" aria-busy={loading}>
      <a href="/" className="shrink-0 text-sm font-bold" aria-label="VECVplan">
        VECV<span className="text-primary-muted">plan</span>
      </a>
      <nav aria-label="Primary navigation" className="flex items-center gap-1">
        <a href="/" aria-current="page" className="rounded px-3 py-1.5 text-sm font-medium">
          Home
        </a>
        <a href="/indent" className="rounded px-3 py-1.5 text-sm font-medium text-primary-muted">
          Indent workbook
        </a>
      </nav>
      <div className="ml-auto flex items-center gap-3 text-xs">
        <span className="hidden md:inline">S&amp;OP-1A ·</span>
        <span className="font-semibold">Jul 2026</span>
        <span className="hidden lg:inline text-primary-muted">Closes in</span>
        <span className="hidden lg:inline font-semibold text-warning">—</span>
        <span className="hidden lg:inline text-primary-muted">Status:</span>
        <span className="font-semibold text-warning">Not submitted</span>
        <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold">SM</span>
          <span>
            <span className="block text-xs">{identity?.dealerName ?? 'Sharma Motors'}</span>
            <span className="block text-[10px] text-primary-muted">DLR-1002 · Dealer</span>
          </span>
        </span>
        <button type="button" aria-label="Toggle theme" className="min-h-7 min-w-7 rounded px-2 text-primary-muted">◐</button>
        <button type="button" aria-label="Sign out" className="min-h-7 min-w-7 rounded px-2 text-primary-muted">⎋</button>
      </div>
    </header>
  );
}

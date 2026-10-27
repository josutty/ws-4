export interface AbpStatusCardProps { status?: 'available' | 'unavailable'; value?: string; description?: string }

export function AbpStatusCard({ status = 'unavailable', value = 'Not yet available', description = "Dealer-level ABP targets are being introduced this year and aren't reliable enough yet." }: AbpStatusCardProps) {
  return <section aria-labelledby="abp-status-heading" className="rounded-lg bg-surface p-5"><h2 id="abp-status-heading" className="text-xs font-bold uppercase tracking-wide text-muted">Against ABP</h2><p className="mt-4 text-2xl font-semibold text-muted">{status === 'available' ? value : 'Not yet available'}</p><p className="mt-2 text-sm text-muted">{description}</p></section>;
}

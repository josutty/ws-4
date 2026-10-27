export interface AttentionItem { id: string; count: number; label: string; tone?: 'warning' | 'danger' | 'muted' }
export interface AttentionListProps { items?: AttentionItem[]; onShow?: (item: AttentionItem) => void }

export function AttentionList({ items = [], onShow }: AttentionListProps) {
  return <section aria-labelledby="attention-heading" className="rounded-lg bg-surface p-5"><h2 id="attention-heading" className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">Needs attention</h2>{items.length === 0 ? <p className="text-sm text-muted">Nothing needs attention.</p> : <ul className="space-y-3">{items.map((item) => <li key={item.id} className="flex items-center justify-between"><div><span className={item.tone === 'danger' ? 'mr-3 text-base font-semibold text-danger' : item.tone === 'warning' ? 'mr-3 text-base font-semibold text-warning' : 'mr-3 text-base font-semibold text-muted'}>{item.count}</span><span className="text-sm text-muted">{item.label}</span></div><button type="button" onClick={() => onShow?.(item)} className="rounded px-2 py-1 text-xs font-medium text-muted hover:bg-surface-subtle">Show →</button></li>)}</ul>}</section>;
}

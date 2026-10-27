/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useRef, useState } from 'react';

type FertDetailDrawerProps = {
  onClose?: () => void;
};

const details = [
  ['Vehicle', '–'],
  ['Your segment', '–'],
  ['Eicher segment', '–'],
  ['MPG model', '–'],
  ['Tonnage', '–'],
  ['Fuel', '–'],
  ['cabin', '–'],
  ['Sub-vertical', '–'],
  ['Your stock on hand', '–'],
  ['Under 60 days', '–'],
  ['60–90 days', '–'],
  ['90–180 days', '–'],
  ['Over 180 days', '–'],
  ['Opening stock, 1 Jul', '–'],
  ['Live purchase orders', '–'],
  ['Offtake and retail', '–'],
  ['Last cycle, for this month', '–'],
] as const;

export function FertDetailDrawer({ onClose }: FertDetailDrawerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = () => {
    triggerRef.current?.focus();
    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>('button, [tabindex="0"]'),
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="rounded border border-border bg-surface px-3 py-2 text-sm text-fg"
        onClick={() => setOpen(true)}
      >
        Line detail
      </button>
      {open ? (
        <div className="fixed inset-0 z-40 bg-fg/40" role="presentation">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fert-detail-title"
            tabIndex={-1}
            onKeyDown={trapFocus}
            className="ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-surface p-6 text-fg shadow-lg"
          >
            <h2 id="fert-detail-title" className="text-lg font-semibold">
              Line detail
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className={
                    label === '60–90 days' || label === '90–180 days' || label === 'Over 180 days'
                      ? 'text-danger'
                      : 'text-muted'
                  }>{label}</dt>
                  <dd className="mt-1 font-mono">{value}</dd>
                </div>
              ))}
            </dl>
            <button type="button" className="mt-6 self-start rounded border border-border px-3 py-2" onClick={close}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

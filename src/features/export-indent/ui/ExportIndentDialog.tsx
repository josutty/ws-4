import * as Dialog from '@radix-ui/react-dialog';
import { useRef, useState } from 'react';
import { exportCsv, type CsvValue } from '../lib/exportCsv';

type ExportIndentDialogProps = {
  headers?: CsvValue[];
  rows?: CsvValue[][];
};

const description =
  "In the live product this downloads a file. Here it's on screen so you can check the shape — select all and copy.";


export function ExportIndentDialog({
  headers = [],
  rows = [],
}: ExportIndentDialogProps) {
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const csvRef = useRef<HTMLTextAreaElement>(null);
  const [feedback, setFeedback] = useState('');
  const csv = exportCsv({ headers, rows });

  const copyCsv = async () => {
    try {
      if (!window.navigator.clipboard?.writeText) {
        throw new Error('Clipboard unavailable');
      }

      await window.navigator.clipboard.writeText(csv);
      setFeedback('Copied to clipboard.');
    } catch {
      csvRef.current?.focus();
      csvRef.current?.select();
      setFeedback('Clipboard unavailable. Select the text and copy it.');
    }
  };

  return (
    <Dialog.Root onOpenChange={(open) => !open && setFeedback('')}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="rounded border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg"
        >
          Export
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <Dialog.Content
          aria-label="Export"
          className="fixed left-1/2 top-1/2 w-[min(90vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-6 text-fg shadow-lg"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            copyButtonRef.current?.focus();
          }}
        >
          <Dialog.Description asChild>
            <p className="mb-4 text-sm text-muted">{description}</p>
          </Dialog.Description>
          <textarea
            ref={csvRef}
            aria-label="CSV export"
            readOnly
            value={csv}
            className="mb-4 min-h-40 w-full resize-y rounded border border-border bg-surface-muted p-3 font-mono text-xs text-fg"
          />
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded border border-border bg-surface px-3 py-1.5 text-sm text-fg"
              >
                Close
              </button>
            </Dialog.Close>
            <button
              ref={copyButtonRef}
              type="button"
              onClick={() => void copyCsv()}
              className="rounded bg-primary px-3 py-1.5 text-sm font-medium text-on-primary"
            >
              Copy to clipboard
            </button>
          </div>
          {feedback ? (
            <p role="status" aria-live="polite" className="mt-3 text-sm text-muted">
              {feedback}
            </p>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

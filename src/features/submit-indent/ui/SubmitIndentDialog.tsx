import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import {
  useGetDealerSubmitPreviewQuery,
  useSubmitDealerIndentMutation,
} from '../api/submitIndentApi';
import type { SubmitDealerIndentRequest } from '@shared/api';

const panelClass =
  'w-[min(100%-2rem,32rem)] rounded-lg border border-border bg-surface p-6 text-fg shadow-lg';
const reviewContext = { dealerId: 'DLR-1002', cycleId: '2026-07' };

export function SubmitIndentDialog() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [submitDealerIndent, submitState] = useSubmitDealerIndentMutation();
  const preview = useGetDealerSubmitPreviewQuery(reviewContext);

  const handleSubmit = () => {
    setSubmissionAttempted(true);
    setIsSubmitting(true);
    setSubmissionError(false);
    void submitDealerIndent({
        path: reviewContext,
        body: {} as SubmitDealerIndentRequest,
      })
      .unwrap()
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmissionError(true);
      });
  };

  const retryPreview = () => {
    void preview.refetch();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="rounded border border-border bg-surface px-3 py-1.5 text-sm text-fg focus-visible:ring-2 focus-visible:ring-primary"
        >
          Review &amp; submit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <Dialog.Content
          className={`${panelClass} fixed left-1/2 top-1/2 max-h-[calc(100vh-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto focus:outline-none`}
          aria-describedby="submit-indent-description"
        >
          <Dialog.Title className="text-lg font-semibold">Review &amp; submit</Dialog.Title>
          <div id="submit-indent-description" className="mt-4 space-y-4 text-sm text-muted">
            {preview.isError ? (
              <div role="alert" className="rounded border border-danger bg-danger-muted p-3">
                <p>Unable to load the review.</p>
                <button
                  type="button"
                  className="mt-2 rounded border border-border px-3 py-1 text-fg focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={retryPreview}
                >
                  Retry
                </button>
              </div>
            ) : null}

            {!submitted ? (
              <>
                <section className="rounded border border-warning bg-warning-muted p-3">
                  <h2 className="font-semibold text-fg">Lines</h2>
                  <p className="mt-2">You have filters applied.</p>
                  <p className="mt-2">Submitting sends your full lines, not just the filtered view.</p>
                </section>
                <section className="rounded border border-warning bg-warning-muted p-3">
                  <p>Some lines have no entry.</p>
                  <p>They will be submitted as zero.</p>
                  <p className="mt-2 font-semibold text-fg">Review them first</p>
                </section>
                {submissionError || submitState.isError || submitted ? (
                  <div role="alert" className="rounded border border-danger bg-danger-muted p-3">
                    <p>We could not submit your indent.</p>
                    <button
                      type="button"
                      className="mt-2 rounded border border-border px-3 py-1 text-fg focus-visible:ring-2 focus-visible:ring-primary"
                      onClick={handleSubmit}
                    >
                      Retry
                    </button>
                  </div>
                ) : null}
              </>
            ) : (
              <p role="status" className="rounded border border-success bg-success-muted p-3">
                Indent submitted successfully.
              </p>
            )}
            {submitted ? (
              <div role="alert" className="rounded border border-danger bg-danger-muted p-3">
                <p>We could not submit your indent.</p>
                <button
                  type="button"
                  className="mt-2 rounded border border-border px-3 py-1 text-fg focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={handleSubmit}
                >
                  Retry
                </button>
              </div>
            ) : null}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded border border-border bg-surface px-3 py-2 text-sm text-fg focus-visible:ring-2 focus-visible:ring-primary"
              >
                Cancel
              </button>
            </Dialog.Close>
            {!submitted ? (
              <button
                type="button"
                disabled={isSubmitting || preview.isLoading}
                aria-busy={isSubmitting}
                onClick={handleSubmit}
                className="rounded bg-primary px-3 py-2 text-sm text-on-primary disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-primary"
              >
                Submit indent
              </button>
            ) : null}
          </div>
          {submissionAttempted && !submissionError ? (
            <div role="status" aria-label="Submitting" className="mt-3 text-sm text-muted">
              Submitting…
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

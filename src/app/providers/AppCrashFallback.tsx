import type { FallbackProps } from 'react-error-boundary';
import { logger } from '@shared/lib/logger';

export function AppCrashFallback({ error, resetErrorBoundary }: FallbackProps) {
  logger.error('Application crashed', { error });

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center" role="alert">
      <h1 className="text-3xl font-semibold text-fg">Something went wrong</h1>
      <p className="text-body text-muted">Please try again or reload the page.</p>
      <div className="flex gap-3">
        <button className="rounded-md bg-primary px-4 py-2 font-medium text-on-primary" onClick={resetErrorBoundary} type="button">
          Try again
        </button>
        <button className="rounded-md border border-border px-4 py-2 font-medium text-fg" onClick={() => window.location.reload()} type="button">
          Reload
        </button>
      </div>
    </main>
  );
}

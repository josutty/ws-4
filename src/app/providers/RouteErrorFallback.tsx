import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';
import { logger } from '@shared/lib/logger';

export function RouteErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();
  logger.error('Route failed', { error });

  const message = isRouteErrorResponse(error) ? error.statusText : 'The requested page could not be loaded.';

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center" role="alert">
      <h1 className="text-3xl font-semibold text-fg">Unable to load this page</h1>
      <p className="text-body text-muted">{message}</p>
      <div className="flex gap-3">
        <button className="rounded-md border border-border px-4 py-2 font-medium text-fg" onClick={() => navigate(-1)} type="button">
          Go back
        </button>
        <button className="rounded-md bg-primary px-4 py-2 font-medium text-on-primary" onClick={() => window.location.reload()} type="button">
          Reload
        </button>
      </div>
    </main>
  );
}

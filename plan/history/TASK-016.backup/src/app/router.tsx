import { createBrowserRouter } from 'react-router';
import { RouteErrorFallback } from './providers/RouteErrorFallback';

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">404</p>
      <h1 className="text-3xl font-semibold text-fg">Page not found</h1>
      <p className="text-body text-muted">The page you requested does not exist.</p>
      <a className="rounded-md bg-primary px-4 py-2 font-medium text-on-primary focus-visible:outline-none" href="/">
        Go home
      </a>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: '/login',
    lazy: async () => {
      const { SignInPage } = await import('../pages/sign-in');
      return { Component: SignInPage };
    },
    errorElement: <RouteErrorFallback />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <RouteErrorFallback />,
  },
]);

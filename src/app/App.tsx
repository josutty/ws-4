import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router/dom';
import { AppCrashFallback } from './providers/AppCrashFallback';
import { router } from './router';
import { store } from './store';

export function App() {
  return (
    <ErrorBoundary FallbackComponent={AppCrashFallback}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
}

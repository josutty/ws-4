import { Tooltip } from 'radix-ui';
import { useStore } from 'react-redux';
import { signedOut } from '@entities/session';

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

export function SignOutButton() {
  const store = useStore();

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label="⎋"
            className="inline-flex h-8 w-8 items-center justify-center rounded-control bg-transparent text-inverse-muted transition-colors hover:bg-inverse/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            onClick={() => {
              store.dispatch(signedOut());
              store.dispatch({ type: 'session/clearSession' });
            }}
          >
            ⎋
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            className="rounded-control bg-inverse px-2 py-1 text-caption text-primary-fg"
          >
            Sign out
            <Tooltip.Arrow className="fill-inverse" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

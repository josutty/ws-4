import { useState } from 'react';
import { Tooltip } from 'radix-ui';
import { applyTheme } from '@shared/ui/theme';

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

export function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );
  const hint = isDark ? 'Light' : 'dark';

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label="◐"
            aria-pressed={isDark}
            className="inline-flex h-8 w-8 items-center justify-center rounded-control bg-transparent text-inverse-muted transition-colors hover:bg-inverse/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            onClick={() => {
              const nextIsDark = !isDark;
              setIsDark(nextIsDark);
              applyTheme(nextIsDark ? 'dark' : 'light');
            }}
          >
            ◐
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            className="rounded-control bg-inverse px-2 py-1 text-caption text-primary-fg"
          >
            {hint}
            <Tooltip.Arrow className="fill-inverse" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

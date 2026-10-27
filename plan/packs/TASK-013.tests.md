# Context pack — TASK-013 (tests)

**Read ONLY this file** plus the files you create or edit. AGENTS.md is already in your context — do not re-read it, do not open other plan/ or analysis/ files and do not search the repo for conventions; what you need is below.
**Touch ONLY the files in the task's Files table** (a hook blocks the others while the task is in progress). Do not run the whole test suite, lint the whole project or build Storybook.
Write the tests only; they must FAIL now for a valid reason (assertion, or a `new` file that does not exist yet).
**Before you stop:** run `node tools/task.mjs red TASK-013` once. It must report a valid RED; a "suspect" or "already PASS" result means a test is wrong — fix the test (max 2 rounds).
When finished: list the files you changed and stop (team agents: then your HANDOFF line).

## The task

# TASK-013: features/submit-indent — review and submission
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/features/submit-indent/ui/SubmitIndentDialog.tsx | connected | coder | new |
| src/features/submit-indent/index.ts | public api | coder | new |
| src/features/submit-indent/ui/SubmitIndentDialog.test.tsx | test | test-engineer | new |
## Integration contract
Use getDealerSubmitPreview and submitDealerIndent; keep open on normalized error/retry; Radix Dialog 1.8.0.
## UI states
Open, filtered warning, missing-entry warning, submitting, error/retry, success.
## Acceptance
- Alert dialog focus trap/Escape/focus return.
- Full vertical warning, missing-as-zero warning and submit loading/error behavior are explicit.
## Tests
Focus lifecycle, warnings, disabled/loading submit, error remains open and retry.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/indent-workbook
Labels (exact, in order): Review & submit · Cancel · Submit indent · Lines · July (W1–W4) · August · September · vs last cycle's plan for July · You have filters applied. · Submitting sends your full · lines have no entry. · Review them first · Goes to
Display rules: full vertical submits; missing lines submit as zero; positive differences `+`.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/features/submit-indent`

## Existing files you need

### src/features/submit-indent/ui/SubmitIndentDialog.tsx
```tsx
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

```

### src/features/submit-indent/index.ts
```ts
export { SubmitIndentDialog } from './ui/SubmitIndentDialog';

```

## Rules

## 5. Testing

- Vitest + RTL, role-first queries (`getByRole`, `getByLabelText`), `user-event` for interaction.
- Render connected components with `renderWithProviders` from `@test/test-utils` (fresh store per test).
- API is mocked ONLY by MSW (`@mocks/node`); per-test overrides via `server.use(...scenarios.x)`.
  Never `vi.mock` the API layer. `onUnhandledRequest: 'error'`.
- No snapshot tests. Deterministic data only (seeded faker fixtures). No real timers without fake timers.
- Fixtures by index via `at(fixtures, i)` from `@mocks/lib` — strict lint forbids `fixtures[0]!`.
- No Vitest globals: import `describe/it/expect/vi` from `vitest`; test/setup.ts calls `cleanup()`.
- **E2E**: Playwright specs in `e2e/`, run against `npm run dev` in mock mode, desktop + mobile
  projects. One smoke spec per route: renders, axe (WCAG 2.2 AA) has no serious/critical violations in
  light AND dark, no horizontal overflow at mobile width, no console errors. Browser-only bugs get an
  e2e regression spec. Vitest never collects `e2e/` (`test.include` in vite.config.ts).
- Coverage (enforced in vite.config.ts): global 70%; `src/features/**` and `src/widgets/**` 80%.
- **Valid RED** = a test fails on an assertion, OR fails because a file listed as `new` in the
  TASK's Files table doesn't exist yet. Any other failure (setup crash, missing mock, syntax) is an invalid RED.


---

One test per feature listed in the TASK's `Acceptance:` bullets. Name the test after the feature.

| Feature | Unit test (Vitest + RTL) | E2E (page TASK) |
|---|---|---|
| frozen column | `getByRole('rowheader', …)` has `sticky left-0` | scroll the grid sideways; first column's x is unchanged |
| grouped headers | group `columnheader` has `colspan` = number of child columns | — |
| editable cell | type + Enter commits (total/value updates), Esc reverts, invalid input reverts on blur | edit one cell, reload: value persisted (when saved) |
| keyboard grid movement | Arrow keys and Enter move focus to the right cell | — |
| previous value ("was N") | input's accessible description is "was N" | — |
| totals / summary | `role="status"` text updates after an edit | — |
| search / filter | typing filters rows and updates the "x of y" count | — |
| dialog | opens on trigger, focus moves inside, Esc closes, focus returns to trigger | axe clean while open |
| dropdown-menu / tabs / select | keyboard: arrows move, Enter selects, Esc closes | — |
| tooltip | shows on focus as well as hover | — |
| virtual-list | only a window of rows is in the DOM; scrolling renders later rows | — |
| toggle-group | click/arrow to an option → it has `data-state="on"` and its effect is applied | — |
| column-visibility | focus "Columns", Enter, pick an item, Esc (the open menu hides the page from screen readers) → column gone | — |
| design labels | the header/button label list `toEqual`s the list in analysis/design-spec (exact text, exact order) | design compare (reviewer) |
| display rule | each rule in analysis/display-rules.md: e.g. low stock has `text-danger`, empty shows "–" | — |


---

PROJECT.md wins for existing projects. Copied into every context pack; costs no tool calls.

| Library | Use | Never (wrong major) |
|---|---|---|
| React 19 | `ref` is a normal prop (no `forwardRef` needed) · `createRoot` · `act` from `react` | `ReactDOM.render`, `react-dom/test-utils` |
| react-router 7 | import from `react-router` · routes from `routes` in `@shared/config` · lazy route `lazy: async () => ({ Component })` | `react-router-dom`, `<Switch>`, `useHistory` |
| Redux Toolkit 2 | `createSlice({ …, selectors })` · `extraReducers: (builder) => …` · `combineSlices` · project's `useAppSelector`/`useAppDispatch` | object-syntax `extraReducers`, `createStore`, plain `useSelector` |
| RTK Query | `baseApi.injectEndpoints` · `build.query<Result, Arg>` · `providesTags`/`invalidatesTags` · `await mutate(arg).unwrap()` | `fetch`/`axios` in components, manual refetch after a mutation |
| zod 4 | `z.email()`, `z.url()` · messages via `{ error: '…' }` · `z.strictObject()` · `zodResolver` from `@hookform/resolvers/zod` | `z.string().email()`, `{ message: '…' }`, `.flatten()` |
| Tailwind 3.4 | `tailwind.config.ts` + `@tailwind base/components/utilities` · semantic token classes only | v4 `@import "tailwindcss"`, `@theme`, `@tailwindcss/vite`, hex or `style=` |
| Vitest 3 | `import { describe, it, expect, vi } from 'vitest'` (globals are OFF) · `vi.fn`/`vi.spyOn`/`vi.mock` | `jest.*`, relying on global `describe` |
| Testing Library 16 + user-event 14 | render via `test/test-utils.tsx` · `screen.getByRole` · `const user = userEvent.setup(); await user.click(…)` | `fireEvent` for user actions, `getByTestId` first, un-awaited `userEvent.click` |
| MSW 2 | `import { http, HttpResponse } from 'msw'` · `http.get(url, () => HttpResponse.json(data))` · `server.use(…)` per test | `rest.*`, `res(ctx.json())` |
| Storybook 8 | CSF3: `const meta = { component, args } satisfies Meta<typeof X>` · `type Story = StoryObj<typeof meta>` · `fn()` from `@storybook/test` | Storybook 9 imports (`storybook/test`), CSF2 `Template.bind` |
| faker 9 | `faker.seed(n)` · `faker.person.fullName()` · `faker.string.uuid()` · `faker.internet.email({ provider: 'example.com' })` | `faker.name.*`, `faker.datatype.uuid()` |
| Playwright 1 + axe | `import AxeBuilder from '@axe-core/playwright'` · `await new AxeBuilder({ page }).analyze()` | `axe-playwright`, `page.waitForTimeout` as a fix |
| ESLint 9 | flat `eslint.config.js` | `.eslintrc*` |

## Templates

### agent-docs/templates/test-engineer.md

Verified on the reference app (typecheck, strict lint, tests, build, Storybook).
Copy them exactly; adapt only names, fields and paths from the TASK.

## 1. test/setup.ts

```typescript
// test/setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '@mocks/node';
import { resetDb } from '@mocks/db';

// jsdom lacks matchMedia; applyTheme() and responsive hooks rely on it.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false, media: query, onchange: null,
    addListener: () => {}, removeListener: () => {},
    addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false,
  });
}

// Radix primitives (menus, popovers) call these browser APIs that jsdom doesn't implement.
Element.prototype.scrollIntoView ??= () => {};
Element.prototype.hasPointerCapture ??= () => false;
Element.prototype.releasePointerCapture ??= () => {};
globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup(); // explicit: RTL auto-cleanup needs Vitest globals, which we don't enable
  server.resetHandlers();
  resetDb();
});
afterAll(() => server.close());
```

## 2. test/test-utils.tsx

```tsx
// test/test-utils.tsx
import type { ReactElement, ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { makeStore } from '@app/store';

interface ProviderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Parameters<typeof makeStore>[0];
  store?: ReturnType<typeof makeStore>;
  route?: string;
}

/** Fresh store per call (AGENTS.md §5). Returns the store and a user-event instance. */
export function renderWithProviders(ui: ReactElement, { preloadedState, store = makeStore(preloadedState), route = '/', ...options }: ProviderOptions = {}) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, user: userEvent.setup(), ...render(ui, { wrapper: Wrapper, ...options }) };
}

export * from '@testing-library/react';
```

## 3. connected component — all four data states, retry, mutation

```tsx
// connected component — all four data states, retry, mutation
import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, within } from '@test/test-utils';
import { server } from '@mocks/node';
import { scenarios } from '@mocks/scenarios';
import { productFixtures } from '@mocks/fixtures/product';
import { at } from '@mocks/lib';
import { ProductCatalog } from './ProductCatalog';

describe('ProductCatalog', () => {
  it('shows a loading skeleton first', () => {
    server.use(...scenarios.productsSlow);
    renderWithProviders(<ProductCatalog />);
    expect(screen.getByRole('list', { name: 'Loading products' })).toBeInTheDocument();
  });

  it('renders products on success', async () => {
    renderWithProviders(<ProductCatalog />);
    expect(await screen.findByRole('heading', { name: at(productFixtures, 0).name })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(20);
  });

  it('shows the empty state', async () => {
    server.use(...scenarios.productsEmpty);
    renderWithProviders(<ProductCatalog />);
    expect(await screen.findByText('No products match your filters')).toBeInTheDocument();
  });

  it('shows an error with a working retry', async () => {
    server.use(...scenarios.productsServerError);
    const { user } = renderWithProviders(<ProductCatalog />);
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText('Something went wrong')).toBeInTheDocument();
    server.resetHandlers(); // the next request succeeds
    await user.click(within(alert).getByRole('button', { name: 'Retry' }));
    expect(await screen.findByRole('heading', { name: at(productFixtures, 0).name })).toBeInTheDocument();
  });
});
```

## 4. form (excerpt — imports as in the presentational test) — accessible errors, no s

```tsx
// form (excerpt — imports as in the presentational test) — accessible errors, no submit on invalid input
it('shows linked field errors and does not submit invalid input', async () => {
  const onSubmit = vi.fn(() => Promise.resolve());
  const user = userEvent.setup();
  render(<SignInForm onSubmit={onSubmit} />);
  await user.type(screen.getByLabelText('Email'), 'nope');
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
  const email = screen.getByLabelText('Email');
  expect(email).toHaveAttribute('aria-invalid', 'true');
  expect(email).toHaveAccessibleDescription('Enter a valid email address');
  expect(onSubmit).not.toHaveBeenCalled();
});
```

## 5. e2e/products.spec.ts — page smoke: render, a11y (light + dark), no overflow, no 

```typescript
// e2e/products.spec.ts — page smoke: render, a11y (light + dark), no overflow, no console errors
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('/ (products)', () => {
  test('renders, has no serious a11y violations, and no horizontal overflow', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Products' })).toBeVisible();
    await expect(page.getByRole('article').first()).toBeVisible();

    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });

  test('dark mode keeps a11y clean', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
  });
});
```

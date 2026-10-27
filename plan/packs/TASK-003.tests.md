# Context pack — TASK-003 (tests)

**Read ONLY this file** plus the files you create or edit. AGENTS.md is already in your context — do not re-read it, do not open other plan/ or analysis/ files and do not search the repo for conventions; what you need is below.
**Touch ONLY the files in the task's Files table** (a hook blocks the others while the task is in progress). Do not run the whole test suite, lint the whole project or build Storybook.
Write the tests only; they must FAIL now for a valid reason (assertion, or a `new` file that does not exist yet).
**Before you stop:** run `node tools/task.mjs red TASK-003` once. It must report a valid RED; a "suspect" or "already PASS" result means a test is wrong — fix the test (max 2 rounds).
When finished: list the files you changed and stop (team agents: then your HANDOFF line).

## The task

# TASK-003: features/authenticate — sign-in form
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/features/authenticate/ui/SignInForm.tsx | connected | coder | new |
| src/features/authenticate/index.ts | public api | coder | edit |
| src/features/authenticate/ui/SignInForm.test.tsx | test | test-engineer | new |
| src/shared/api/baseApi.ts | API foundation | store-architect | edit |
## Integration contract
Use loginDealer, loginWithVecvnetSso and requestPasswordReset RTK Query mutations; react-hook-form/zod; `.unwrap()`; normalized errors.
## Components and states
Dealer code/email and password form; default, focus, invalid field, submitting, request error/retry, reset confirmation.
## Tests
Required/autocomplete/aria wiring; invalid exact messages; disabled submit; login, SSO, reset, error and success.
## Design
Source: inputs/ux/dealer.html#login  Spec: analysis/design-spec/dealer-login.md
Route: /login
Labels (exact, in order): Sign in · Dealer code or email · Password · Forgot password? · Sign in · Sign in with VECVNet SSO
Display rules: copy exactly from analysis/ui-states.md.
## Teardown
RTK Query unsubscribes; none manual.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/features/authenticate`

## Existing files you need

### src/features/authenticate/ui/SignInForm.tsx
```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import {
  useLoginDealerMutation,
  useLoginWithVecvnetSsoMutation,
  useRequestPasswordResetMutation,
} from '../api/authenticateApi';
import { getErrorMessage, type ApiError } from '@shared/api';

const signInSchema = z.object({
  dealerCodeOrEmail: z.string().min(1, { error: 'Dealer code or email is required' }),
  password: z.string().min(1, { error: 'Password is required' }),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [loginDealer, loginDealerState] = useLoginDealerMutation();
  const [loginWithSso, loginWithSsoState] = useLoginWithVecvnetSsoMutation();
  const [requestPasswordReset, resetState] = useRequestPasswordResetMutation();
  const [requestError, setRequestError] = useState<string | null>(null);
  const [resetConfirmation, setResetConfirmation] = useState(false);
  const [lastAction, setLastAction] = useState<'dealer' | 'sso' | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (values: SignInValues) => {
    setLastAction('dealer');
    setRequestError(null);
    setResetConfirmation(false);

    try {
      await loginDealer({ dealerCodeOrEmail: values.dealerCodeOrEmail, password: values.password }).unwrap();
    } catch (error) {
      const rawMessage = getErrorMessage(error as ApiError);
const message = rawMessage === 'Request failed' ? 'Something went wrong' : rawMessage;
setRequestError(message);
      if (message.toLowerCase().includes('dealer') || message.toLowerCase().includes('email')) {
        setError('dealerCodeOrEmail', { type: 'server', message });
      }
    }
  };

  const handleSso = async () => {
    setLastAction('sso');
    setRequestError(null);
    try {
      await loginWithSso({ provider: 'VECVNet' }).unwrap();
    } catch (error) {
      setRequestError(getErrorMessage(error as ApiError));
    }
  };

  const handleReset = async () => {
    const dealerCodeOrEmail = getValues('dealerCodeOrEmail');
    if (!dealerCodeOrEmail) {
      setError('dealerCodeOrEmail', {
        type: 'required',
        message: 'Dealer code or email is required',
      });
      return;
    }

    setRequestError(null);
    try {
      await requestPasswordReset({ dealerCodeOrEmail }).unwrap();
      setResetConfirmation(true);
    } catch (error) {
      setRequestError(getErrorMessage(error as ApiError));
    }
  };

  const retry = () => {
    if (lastAction === 'sso') {
      void handleSso();
      return;
    }
    void handleSubmit(onSubmit)();
  };

  const busy = isSubmitting || loginDealerState.isLoading || loginWithSsoState.isLoading || resetState.isLoading;

  return (
    <section className="mx-auto w-full max-w-[400px] rounded-[9px] bg-surface p-8 text-fg shadow-lg">
      <h1 className="mb-2 text-[19px] font-semibold">Sign in</h1>
      <p className="mb-6 text-[13px] text-muted">Dealer code or work email.</p>
      <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-1 block text-xs font-semibold text-muted" htmlFor="dealer-code-or-email">
            Dealer code or email
          </label>
          <input
            className="h-[38px] w-full rounded-[5px] border border-border bg-surface px-3 text-sm text-fg focus:ring-2 focus:ring-primary"
            id="dealer-code-or-email"
            required
            autoComplete="username"
            aria-invalid={errors.dealerCodeOrEmail ? 'true' : 'false'}
            aria-describedby={errors.dealerCodeOrEmail ? 'dealer-code-or-email-error' : undefined}
            {...register('dealerCodeOrEmail')}
          />
          {errors.dealerCodeOrEmail && (
            <p className="mt-1 text-xs text-danger" id="dealer-code-or-email-error">
              {errors.dealerCodeOrEmail.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-muted" htmlFor="password">
            Password
          </label>
          <input
            className="h-[38px] w-full rounded-[5px] border border-border bg-surface px-3 text-sm text-fg focus:ring-2 focus:ring-primary"
            id="password"
            type="password"
            required
            autoComplete="current-password"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-danger" id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>
        <button className="h-[38px] w-full rounded-[5px] bg-primary text-sm font-medium text-on-primary disabled:opacity-60" disabled={busy} type="submit">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <button className="mx-auto block text-[13px] text-primary underline disabled:opacity-60" disabled={busy} onClick={handleReset} type="button">
          Forgot password?
        </button>
        <div className="flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-border" /><span>or</span><span className="h-px flex-1 bg-border" /></div>
        <button className="h-[38px] w-full rounded-[5px] border border-border bg-surface text-[13.5px] font-medium text-muted disabled:opacity-60" disabled={busy} onClick={handleSso} type="button">
          Sign in with VECVNet SSO
        </button>
        {resetConfirmation && <p className="text-center text-sm text-success" role="status">Password reset email sent</p>}
        {requestError && (
          <div className="flex items-center justify-between gap-3 rounded border border-danger p-2 text-sm text-danger" role="alert">
            <span>{requestError}</span>
            <button className="underline" disabled={busy} onClick={retry} type="button">Retry</button>
          </div>
        )}
      </form>
    </section>
  );
}

```

## Public APIs you may import (signatures)

### src/shared/api/index.ts
```ts
export { baseApi } from './baseApi';
export { getErrorMessage, type ApiError } from './errors';
export { sessionExpired } from './events';
export type * from './generated/models';

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

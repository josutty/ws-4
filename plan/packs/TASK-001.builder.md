# Context pack — TASK-001 (builder)

**Read ONLY this file** plus the files you create or edit. AGENTS.md is already in your context — do not re-read it, do not open other plan/ or analysis/ files and do not search the repo for conventions; what you need is below.
**Touch ONLY the files in the task's Files table** (a hook blocks the others while the task is in progress). Do not run the whole test suite, lint the whole project or build Storybook.
Make the task's tests pass and match the design spec exactly. Never invent text, colors or behaviour the spec and display rules do not show.
**Before you stop:** run `node tools/task.mjs check TASK-001` (it prints only failures and writes plan/packs/TASK-001.failures.md). Fix only what it lists, at most 2 rounds; still failing → stop and say what is left.
When finished: list the files you changed and stop (team agents: then your HANDOFF line).

## The task

# TASK-001: shared/ui — base controls and feedback
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/shared/ui/Button.tsx | presentational | component-generator | new |
| src/shared/ui/Input.tsx | presentational | component-generator | new |
| src/shared/ui/Select.tsx | presentational | component-generator | new |
| src/shared/ui/DensityToggle.tsx | presentational | component-generator | new |
| src/shared/ui/ToastRegion.tsx | presentational | component-generator | new |
| src/shared/ui/index.ts | public api | component-generator | edit |
## Integration contract
Props-only primitives; no server data or store. Use semantic tokens. DensityToggle uses Radix ToggleGroup 1.8.0; ToastRegion uses Sonner 2.0.8.
## Components
Button variants; labelled/invalid Input; labelled native Select; single-choice Comfortable/Compact DensityToggle; polite status ToastRegion.
## UI states
Default, disabled, invalid, selected density, visible/hidden toast.
## Acceptance
- Toggle click/arrow selects one density and exposes selected state.
- Toast has `role=status` and polite live announcement.
## Tests
Labels, invalid descriptions, native select, toggle keyboard selection, status announcement, and all variants.
## Design
Source: inputs/ux/dealer.html#login and inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-login.md; analysis/design-spec/dealer-app.md
Route: shared primitives
Labels (exact, in order): Sign in · Dealer code or email · Password · Comfortable · Compact
Display rules: semantic tokens only.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/shared/ui && npm run build-storybook`

## Design spec (measured — copy labels exactly)

(analysis/design-spec/dealer-login.md; not found — run: node tools/design-spec.mjs extract inputs/ux/dealer.html#login)

## Rules

## 4. Styling

- Tailwind utilities only. Colors via SEMANTIC tokens (`bg-surface`, `text-fg`, `bg-primary`,
  `text-danger`, `border-border`), which map to CSS variables in `src/shared/ui/theme/tokens.css`.
- Forbidden in `.tsx`: `style=`, hex/rgb literals, CSS modules, raw palette classes (`bg-blue-600`),
  dynamically built class names (`bg-${color}`) — use a map of full class strings instead.
- Dark mode = `class` on `<html>`; semantic tokens switch automatically, so `dark:` is rarely needed.
- Mobile-first breakpoints (`sm: md: lg: xl:`).
- Token names and state recipes: `plan/design-system.md` (styling-engineer). Contrast is verified
  by `node tools/check-contrast.mjs` (WCAG 2.2 AA, light and dark), never by eye.


---

## 12. UI conventions (senior-level defaults — PROJECT.md may override for existing projects)

**Accessibility — WCAG 2.2 AA is the bar, not a nice-to-have**
- Semantic elements first (`button`, `a`, `nav`, `main`, `h1–h3`, `ul/li`, `table`); one `h1` per page;
  heading levels never skip.
- Every interactive element has an accessible name; icon-only buttons use `aria-label`.
- Visible focus everywhere (base.css ring — never `outline-none` without a replacement); logical tab
  order; no keyboard traps; dialogs trap focus and return it on close; Escape closes overlays.
- Targets ≥ 24×24 px (2.2 AA); text contrast ≥ 4.5:1, control borders/focus ≥ 3:1 (checked by script).
- Errors use `role="alert"`; async regions use `aria-busy`; loading skeletons are `aria-hidden` with
  a labelled container.
- Respect `prefers-reduced-motion` (base.css); never convey state by color alone.

**Forms**
- react-hook-form + `zodResolver`; the schema lives in `<slice>/lib/<form>Schema.ts` (zod 4 syntax:
  `z.email({ error: '…' })`).
- Every field: visible `<label htmlFor>`; invalid → `aria-invalid` + `aria-describedby` pointing at the
  error text; `autoComplete` set; `noValidate` on the form (the schema is the validator).
- Submit: button shows `loading` and is disabled while submitting; mutation via `.unwrap()`; server
  field errors mapped with `setError`; a form-level server error renders in `role="alert"`.

**Routing & auth**
- Route paths only from `routes` in `@shared/config`; every page is a lazy route with `errorElement`.
- Guarded routes sit under app-bootstrap's `RequireAuth` layout route (redirects to sign-in with
  `state.from`); pages never check auth themselves. A 401 dispatches `sessionExpired`, which clears
  the session and sends guarded routes to sign-in.

**Text, numbers, dates**
- Numbers, currency and dates via `Intl` helpers in `shared/lib/format` — never string concatenation.
- i18n only when the client FSD doc or PROJECT.md requires it; then every user-facing string goes
  through the project's i18n library.

---

## Rules
1. **Content is copied, not interpreted** — labels, order, group headers, button texts, placeholders, exactly.
   A TASK that disagrees with the spec → BLOCKED-DESIGN.
2. **Every measured value maps to a token or a Tailwind step**; nearest step within 1px, otherwise styling-engineer
   adds a token. Never hex, never `style=`.
3. **Colors come only from tokens; tokens come from the spec's Palette.** Page background included.
4. **A gradient or background image is a design value like any colour**: every entry of the spec's "Gradients and
   background images" section becomes one token (`--gradient-<name>`, exact stops and angle) and one class (`bg-<name>`).
   Never approximate it with a flat colour, and never take the page colour from the `<body>` alone — the gradient may sit
   on the screen's own element.
5. **Text must be readable where the design puts it.** White text stays white only on the design's dark gradient — if the
   background is not built, the text vanishes. The check blocks any text under 1.6:1.
6. **Display rules are rules** (conditional colors, "–" for empty, formats) → `analysis/display-rules.md`; unclear →
   Gate 1 question. **Never invent a rule** and **never hard-code the design's sample data** as a fallback — show the API
   value, or the error state. In mock mode the mock returns the design's sample values (mock-data-generator).
7. **Match the design — contrast included.** If a measured design value fails WCAG contrast (e.g. a faint input border),
   KEEP the design value and list it under "Contrast concerns" in plan/design-system.md (where, both ratios). The human
   decides at Gate 1/3; a difference they accept goes into `plan/design-accepted.md` (humans only — agents never edit it).
   Never change a measured look silently.
8. **Pages are compared after their route exists** — the coder wires the route inside the page TASK.
9. **Done** = 0 blocking differences; every style difference has its one-line reason.

Tolerances: font ±0.5px · padding ±2px · heights ±4px · widths ±15% · colors ±12 per RGB channel = same, 13–40 = style,
over 40 = look · gradient angle ±25° · texts on one line ±4px.
Not compared — check by eye at Gate 3: exact vertical spacing between blocks, icons/images, shadows, hover/focus states, animation.


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

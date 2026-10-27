---
id: TASK-004
status: done
revision: 1
tests: first
depends-on: [TASK-003]
created: 2026-10-26
---
# TASK-004: pages/sign-in — login route
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/pages/sign-in/ui/SignInPage.tsx | page | coder | new |
| src/pages/sign-in/index.ts | public api | coder | new |
| src/app/router.tsx | route | coder | edit |
| src/shared/config/routes.ts | route config | coder | edit |
| e2e/login.spec.ts | e2e | test-engineer | new |
| src/pages/sign-in/ui/SignInPage.test.tsx | test | test-engineer | new |
## Integration contract
Composition-only centered page with SignInForm; lazy `/login` route and errorElement.
## UI states
Centered card, narrow viewport scroll, delegated form states.
## Tests
One main landmark/one h1, exact labels; e2e light/dark axe, mobile overflow and console smoke.
## Design
Source: inputs/ux/dealer.html#login  Spec: analysis/design-spec/dealer-login.md
Route: /login
Labels (exact, in order): VECVplan · S&OP-1A · Jul 2026 · · Indent closes · 15 Jul, 23:59 IST · Sign in · Dealer code or work email. · or · Trouble signing in? Contact Sales Planning support · Prototype · your role and verticals come from your account
Display rules: measured 150deg gradient and centered 400px card.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/pages/sign-in && npm run build-storybook`

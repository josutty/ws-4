---
id: TASK-003
status: done
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-10-26
---
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

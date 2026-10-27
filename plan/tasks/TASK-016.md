---
id: TASK-016
status: in-progress
revision: 1
tests: first
depends-on: [TASK-007, TASK-008, TASK-009, TASK-010, TASK-011, TASK-012, TASK-013, TASK-014, TASK-015]
created: 2026-10-26
---
# TASK-016: pages/dealer-home — dashboard route
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/pages/dealer-home/ui/DealerHomePage.tsx | page | coder | new |
| src/pages/dealer-home/index.ts | public api | coder | new |
| src/app/router.tsx | route | coder | edit |
| src/shared/config/routes.ts | route config | coder | edit |
| e2e/dealer-home.spec.ts | e2e | test-engineer | new |
| src/pages/dealer-home/ui/DealerHomePage.test.tsx | test | test-engineer | new |
## Integration contract
Composition-only page; lazy authenticated route with errorElement; widgets own data and states.
## UI states
Home loading/error/empty/success.
## Tests
One main and h1; exact labels/order; e2e light/dark axe, mobile overflow and console smoke.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/home
Labels (exact, in order): Prototype control · Viewing as · Good afternoon, Sharma Motors · July 2026 · LMD and HD · Delhi NCR, 3 outlets · Indent progress · Summary — · Rollup · Filters · Clear all · Save view · LMD · HD · Search code or description · + Add FERT · Export · Comfortable · Compact · ☷ Columns · Review & submit
Display rules: labels/order exactly as spec; `node tools/design-spec.mjs compare dealer.html#app /dealer/home --start` → 0 blocking differences.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/pages/dealer-home && npm run build-storybook`

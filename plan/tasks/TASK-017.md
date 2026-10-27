---
id: TASK-017
status: in-progress
revision: 1
tests: first
depends-on: [TASK-010, TASK-011, TASK-012, TASK-013, TASK-014, TASK-015]
created: 2026-10-26
---
# TASK-017: pages/indent-workbook — workbook route
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/pages/indent-workbook/ui/IndentWorkbookPage.tsx | page | coder | new |
| src/pages/indent-workbook/index.ts | public api | coder | new |
| src/app/router.tsx | route | coder | edit |
| src/shared/config/routes.ts | route config | coder | edit |
| e2e/indent-workbook.spec.ts | e2e | test-engineer | new |
| src/pages/indent-workbook/ui/IndentWorkbookPage.test.tsx | test | test-engineer | new |
## Integration contract
Composition-only page; lazy authenticated `/dealer/indent-workbook` route with errorElement; widgets own data and states.
## UI states
Loading, error/retry, empty filtered, editable and submitted/locked.
## Tests
One main/h1 and labelled filter aside/table; exact labels/order; e2e light/dark axe, mobile overflow and console smoke.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/indent-workbook
Labels (exact, in order): Filters · Clear all · Save view · LMD · HD · Search code or description · + Add FERT · Export · Comfortable · Compact · ☷ Columns · Review & submit
Display rules: labels/order exactly as spec; `node tools/design-spec.mjs compare dealer.html#app /dealer/indent-workbook --start` → 0 blocking differences.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/pages/indent-workbook && npm run build-storybook`

---
id: TASK-006
status: done
revision: 1
tests: first
depends-on: [TASK-005]
created: 2026-10-26
---
# TASK-006: widgets/app-top-bar — authenticated header
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/app-top-bar/ui/AppTopBar.tsx | connected | coder | new |
| src/widgets/app-top-bar/index.ts | public api | coder | new |
| src/widgets/app-top-bar/ui/AppTopBar.test.tsx | test | test-engineer | new |
## Integration contract
Read session/planning-cycle endpoints; compose sign-out/theme; navigation callback switches views.
## UI states
Identity/cycle loading/error, Not submitted, Submitted, responsive compressed status.
## Tests
Exact nav/current-page semantics, status styling, named controls, retry/redirect.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: authenticated shell
Labels (exact, in order): VECVplan · Home · Indent workbook · S&OP-1A · · Jul 2026 · Closes in · Status: · Not submitted · Sharma Motors · DLR-1002 · Dealer
Display rules: warning vs success status; compress below 900px.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/app-top-bar`

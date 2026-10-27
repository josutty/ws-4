---
id: TASK-015
status: done
revision: 1
tests: first
depends-on: [TASK-006, TASK-009]
created: 2026-10-26
---
# TASK-015: widgets/dealer-shell — authenticated shell
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/dealer-shell/ui/DealerAppShell.tsx | page | coder | new |
| src/widgets/dealer-shell/index.ts | public api | coder | new |
| src/widgets/dealer-shell/ui/DealerAppShell.test.tsx | test | test-engineer | new |
## Integration contract
Compose AppTopBar and the dashboard/workbook widgets; RequireAuth remains app-bootstrap-owned; no page-level fetch.
## UI states
Authenticated, identity loading/error redirect, Home/workbook navigation, sign-out.
## Tests
Landmarks, active nav, view switching, auth failure, responsive header.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer
Labels (exact, in order): VECVplan · Home · Indent workbook · S&OP-1A · · Jul 2026 · Closes in · Status: · Not submitted · Sharma Motors · DLR-1002 · Dealer
Display rules: semantic `#F4F6F8` page token; active nav programmatic.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/dealer-shell`

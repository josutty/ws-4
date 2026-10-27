---
id: TASK-011
status: done
revision: 1
tests: first
depends-on: [TASK-002, TASK-010]
created: 2026-10-26
---
# TASK-011: widgets/indent-workbook — editable grid
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/indent-workbook/ui/IndentWorkbook.tsx | connected | coder | new |
| src/widgets/indent-workbook/ui/IndentWorkbook.test.tsx | test | test-engineer | new |
## Integration contract
Use listDealerIndentLines and update/batch mutation hooks plus workbook selectors; normalized errors/retry/toast.
## UI states
Loading, error, empty filtered, editable, submitted/locked, no-entry, added-line, stock warning/critical, paste/fill-down.
## Library and Acceptance
- TanStack Table supplies frozen/sticky vehicle column/header, grouped/collapsible headers, sortable columns and horizontal scroll.
- Editable cells commit valid nonnegative values; Enter/Arrow navigation; Esc/invalid blur revert; description says `was N`.
## Tests
Every state; frozen x-position; keyboard movement; commit/Esc/invalid; paste/fill-down; totals; submitted disabled.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/indent-workbook
Labels (exact, in order): Vehicle · FERT code · Vehicle attributes · Current dealer stock · Opening & live POs · Pipeline · Trend — offtake · Trend — retail · Last cycle · Your indent · July 2026 · W1 · W2 · W3 · W4 · Jul · Aug · Sep · Total · No lines match these filters · Clear all filters
Display rules: numeric `–`; age colors; no-entry/ADDED markers; submitted disabled; visible/filtered total labels exact.
## Teardown
RTK Query unsubscribes; no manual resources.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/indent-workbook/ui/IndentWorkbook.test.tsx`

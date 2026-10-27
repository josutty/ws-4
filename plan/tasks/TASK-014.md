---
id: TASK-014
status: done
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-10-26
---
# TASK-014: features/export-indent — CSV export dialog
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/features/export-indent/ui/ExportIndentDialog.tsx | connected | coder | new |
| src/features/export-indent/lib/exportCsv.ts | lib | coder | new |
| src/features/export-indent/index.ts | public api | coder | new |
| src/features/export-indent/ui/ExportIndentDialog.test.tsx | test | test-engineer | new |
## Integration contract
Plain Blob/text CSV; Radix Dialog 1.8.0; copy feedback via ToastRegion.
## UI states
Closed/open, copy success, copy failure with select-text fallback.
## Acceptance
- Dialog focus trap/Escape/focus return.
- CSV emits escaped header/data rows and copy feedback is announced.
## Tests
CSV escaping, focus lifecycle, copy success/failure and exact labels.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/home and /dealer/indent-workbook
Labels (exact, in order): Export · In the live product this downloads a file. Here it's on screen so you can check the shape — select all and copy. · Close · Copy to clipboard
Display rules: current full or filtered scope; never hard-code sample data.
## Teardown
Revoke object URLs; otherwise none.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/features/export-indent`

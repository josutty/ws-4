---
id: TASK-010
status: done
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-10-26
---
# TASK-010: widgets/indent-workbook-controls — filters and toolbar
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/indent-workbook/ui/FilterRail.tsx | connected | coder | new |
| src/widgets/indent-workbook/ui/WorkbookToolbar.tsx | connected | coder | new |
| src/widgets/indent-workbook/ui/ColumnChooser.tsx | connected | coder | new |
| src/widgets/indent-workbook/index.ts | public api | coder | new |
| src/widgets/indent-workbook/ui/controls.test.tsx | test | test-engineer | new |
## Integration contract
Workbook-view selectors/actions only. Radix Tooltip and DropdownMenu 1.8.0.
## UI states
Expanded/collapsed, filter popover/no match, saved views empty/available, default/filtered/sorted toolbar, chooser closed/open.
## Acceptance
- Dropdown menu supports arrows/Enter/Escape and focus restoration.
- Column visibility Hide/Summary/Full removes a column; Collapse tooltip works on focus/hover.
- Search/filter updates the x-of-y count.
## Tests
All states, keyboard menu flow, screen-reader isolation, hidden column and exact labels.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/indent-workbook
Labels (exact, in order): Filters · Vertical · FERT · Sub-vertical · Demand segment · MPG model · Tonnage · Fuel · Cabin · FERT History · Status · Clear all · Save view · Saved views · Search fert… · Paste a list of codes from a spreadsheet to select many at once. · LMD · HD · Search code or description · + Add FERT · Export · Comfortable · Compact · ☷ Columns · Presets · Essentials · Stock focus · Trends · Everything · Column groups · Hide · Summary · Full
Display rules: filter chips accent-tinted; sort chip neutral.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/indent-workbook`

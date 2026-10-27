---
id: TASK-009
status: done
revision: 1
tests: first
depends-on: [TASK-002, TASK-008]
created: 2026-10-26
---
# TASK-009: widgets/dealer-dashboard-report — report and rollup
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/dealer-dashboard/ui/IndentAccuracyReport.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/IndentRollup.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/report-rollup.test.tsx | test | test-engineer | new |
## Integration contract
Indent-line data and workbook selectors through existing hooks; shared DataTable/TanStack Table.
## UI states
Collapsed/expanded, outlet/vehicle, empty vehicle history, grouped rollup expanded/collapsed with totals.
## Library and Acceptance
- TanStack Table provides grouped headers, expandable rows/totals, frozen column, sticky header and horizontal scroll.
- Radix ToggleGroup keyboard/click group-by selection exposes selected state and changes grouping.
## Tests
View toggle, empty history, header spans, frozen sideways scroll, expansion, totals and exact labels.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/home
Labels (exact, in order): Your indent accuracy · 4-cycle average · bias · Indent · offtake · ▸ View report card · Indent accuracy — last four cycles · By outlet · By vehicle · Monthly · Outlet · Vehicle · Accuracy · Bias · Rollup · Group by · Vertical · Sub-vertical · MPG · Tonnage · AC / Non-AC · Segment · FERT · YOUR INDENT · JULY 2026 · W1 · W2 · W3 · W4 · JUL · AUG · SEP · TOTAL · Demand mix · Stock · Off L3 · Ret L3 · Δ vs last · Total
Display rules: empty `–`; positive differences `+`; accuracy ≥90 success, ≥80 warning, else critical.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/dealer-dashboard`

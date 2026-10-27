---
id: TASK-008
status: done
revision: 1
tests: first
depends-on: [TASK-002, TASK-007]
created: 2026-10-26
---
# TASK-008: widgets/dealer-dashboard-analytics — summary cards
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/dealer-dashboard/ui/IndentDemandSignalCard.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/StockOnHandCard.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/DemandMixCard.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/IndentAccuracyCard.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/analytics.test.tsx | test | test-engineer | new |
## Integration contract
Consume dealer summary hooks and apply existing workbook filters.
## UI states
Loaded threshold cards with text alternatives; query loading/error delegated to page.
## Tests
Run-rate ±15%, delta ±10%, stock bands, Runner/Repeater/Stranger colors, accuracy bias/thresholds and action labels.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/home
Labels (exact, in order): Indent vs demand signal · July indent · 3-month offtake · against your own offtake run-rate · Stock on hand by age · units on hand · over 60 days · Under 60 days · 60–90 days · 90–180 days · Over 180 days · Demand mix — Runner / Repeater / Stranger · FERTs in your July indent · Runner · Repeater · Stranger · Your indent accuracy · 4-cycle average · bias · Indent · offtake
Display rules: empty `–`; stock and threshold colors per analysis/display-rules.md.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/dealer-dashboard`

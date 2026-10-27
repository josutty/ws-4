---
id: TASK-007
status: done
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-10-26
---
# TASK-007: widgets/dealer-dashboard-core — progress cards
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/widgets/dealer-dashboard/ui/PrototypePersonaControl.tsx | presentational | component-generator | new |
| src/widgets/dealer-dashboard/ui/IndentProgressCard.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/VerticalStatusCard.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/AttentionList.tsx | connected | coder | new |
| src/widgets/dealer-dashboard/ui/AbpStatusCard.tsx | presentational | component-generator | new |
| src/widgets/dealer-dashboard/index.ts | public api | coder | new |
| src/widgets/dealer-dashboard/ui/PrototypePersonaControl.stories.tsx | story | component-generator | new |
| src/widgets/dealer-dashboard/ui/AbpStatusCard.stories.tsx | story | component-generator | new |
## Integration contract
Dealer/indent-line RTK Query data and workbook selectors; props-only persona/ABP components.
## UI states
Loading/error/empty/success; not started/in progress/submitted; attention clear/has items.
## Tests
Status display rules, attention filter actions, persona select, exact ABP copy, dashboard retry/empty.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/home
Labels (exact, in order): Prototype control · Viewing as · Dealer — Sharma Motors · ASM — North Cluster · RSM — North Region · Vertical Head — LMD · ISO — Central Planning · Your July indent — LMD · of 52 lines entered · units for July · Not submitted · Auto-submits · 15 Jul, 23:59 IST · Continue · Review & submit · Your verticals · LMD · HD · In progress · Not started · Open → · Both close at the same cut-off. · Needs attention · lines with no entry · lines with stock over 180 days · lines more than ±20% off last cycle · Show → · Against ABP · Not yet available
Display rules: status colors and clear message exactly as analysis/display-rules.md.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/widgets/dealer-dashboard`

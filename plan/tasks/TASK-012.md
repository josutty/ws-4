---
id: TASK-012
status: done
revision: 1
tests: first
depends-on: [TASK-001, TASK-011]
created: 2026-10-26
---
# TASK-012: features/edit-indent — detail and add dialogs
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/features/edit-indent/ui/FertDetailDrawer.tsx | connected | coder | new |
| src/features/edit-indent/ui/AddFertDialog.tsx | connected | coder | new |
| src/features/edit-indent/index.ts | public api | coder | new |
| src/features/edit-indent/ui/edit-dialogs.test.tsx | test | test-engineer | new |
## Integration contract
Indent-line/catalogue queries and addDealerIndentLine; Radix Dialog 1.8.0; normalized errors/retry.
## UI states
Drawer closed/open/scrim/Escape; add open/no-match/selection/error/success.
## Acceptance
- Both dialogs trap focus, close on Escape and return focus.
- Catalogue search, multi-select count and add mutation work.
## Tests
Focus lifecycle, no-match, selection, mutation retry, exact labels and stock display rules.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/indent-workbook
Labels (exact, in order): Line detail · Vehicle · Your segment · Eicher segment · MPG model · Tonnage · Fuel · cabin · Sub-vertical · Your stock on hand · Under 60 days · 60–90 days · 90–180 days · Over 180 days · Opening stock, 1 Jul · Live purchase orders · Offtake and retail · Last cycle, for this month · Close · Add FERT to your indent · Search code or description… · None selected · Cancel · Add selected · No matching code in the catalogue.
Display rules: stock ages warning/critical; empty numeric `–`.
## Teardown
Radix/RTK Query automatic; none manual.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/features/edit-indent`

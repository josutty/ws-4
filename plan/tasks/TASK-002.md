---
id: TASK-002
status: done
revision: 1
tests: first
depends-on: []
created: 2026-10-26
---
# TASK-002: shared/ui/data-grid — generic accessible grid
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/shared/ui/data-grid/DataTable.tsx | presentational | component-generator | new |
| src/shared/ui/data-grid/data-grid.ts | lib | component-generator | new |
| src/shared/ui/data-grid/index.ts | public api | component-generator | new |
| src/shared/ui/data-grid/DataTable.test.tsx | test | test-engineer | new |
| test/setup.ts | test harness | test-engineer | new |
## Integration contract
Generic props in/markup out; no business data. TanStack Table-compatible grouped headers, sticky/frozen hooks and horizontal overflow.
## Components and states
DataTable with loading (`aria-busy`), empty, grouped-header and scrollable success states.
## Library
TanStack Table 8.21.3.
## Acceptance
- Frozen/sticky headers and first column remain usable during sideways scroll.
- Grouped headers expose child-column count.
## Tests
Grouped spans, sticky class, loading label, empty announcement.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: shared primitive
Labels (exact, in order): SUB-VERTICAL · LINES · YOUR INDENT · JULY 2026 · Demand mix ▾ · Stock ▸ · Off L3 ▸ · Ret L3 ▸ · Δ vs last ▸
Display rules: empty numeric values render `–`.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/shared/ui/data-grid`

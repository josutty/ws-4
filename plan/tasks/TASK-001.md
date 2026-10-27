---
id: TASK-001
status: done
revision: 1
tests: after
depends-on: []
created: 2026-10-26
---
# TASK-001: shared/ui — base controls and feedback
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/shared/ui/Button.tsx | presentational | component-generator | new |
| src/shared/ui/Input.tsx | presentational | component-generator | new |
| src/shared/ui/Select.tsx | presentational | component-generator | new |
| src/shared/ui/DensityToggle.tsx | presentational | component-generator | new |
| src/shared/ui/ToastRegion.tsx | presentational | component-generator | new |
| src/shared/ui/index.ts | public api | component-generator | edit |
## Integration contract
Props-only primitives; no server data or store. Use semantic tokens. DensityToggle uses Radix ToggleGroup 1.8.0; ToastRegion uses Sonner 2.0.8.
## Components
Button variants; labelled/invalid Input; labelled native Select; single-choice Comfortable/Compact DensityToggle; polite status ToastRegion.
## UI states
Default, disabled, invalid, selected density, visible/hidden toast.
## Acceptance
- Toggle click/arrow selects one density and exposes selected state.
- Toast has `role=status` and polite live announcement.
## Tests
Labels, invalid descriptions, native select, toggle keyboard selection, status announcement, and all variants.
## Design
Source: inputs/ux/dealer.html#login and inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-login.md; analysis/design-spec/dealer-app.md
Route: shared primitives
Labels (exact, in order): Sign in · Dealer code or email · Password · Comfortable · Compact
Display rules: semantic tokens only.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/shared/ui && npm run build-storybook`

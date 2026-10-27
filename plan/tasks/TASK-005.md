---
id: TASK-005
status: done
revision: 1
tests: first
depends-on: [TASK-001]
created: 2026-10-26
---
# TASK-005: features/session-actions — theme and sign-out
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/features/toggle-theme/ui/ThemeToggleButton.tsx | presentational | component-generator | new |
| src/features/sign-out/ui/SignOutButton.tsx | connected | coder | new |
| src/features/toggle-theme/index.ts | public api | component-generator | edit |
| src/features/sign-out/index.ts | public api | coder | edit |
| src/features/toggle-theme/ui/ThemeToggleButton.stories.tsx | story | component-generator | new |
| src/features/toggle-theme/ui/ThemeToggleButton.test.tsx | test | test-engineer | new |
| src/features/sign-out/ui/SignOutButton.test.tsx | test | test-engineer | edit |
## Integration contract
Theme uses applyTheme; sign-out clears session. Radix Tooltip 1.8.0 for both hints.
## UI states
Light/dark pressed state and sign-out idle/action.
## Acceptance
- Focus and hover expose Light / dark and Sign out tooltips.
- Theme changes semantic tokens; sign-out clears session.
## Tests
Tooltip focus, pressed toggle and sign-out action/name.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: authenticated shell
Labels (exact, in order): ◐ · ⎋
Display rules: no raw palette classes.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/features/toggle-theme src/features/sign-out`

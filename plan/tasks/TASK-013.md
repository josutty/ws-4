---
id: TASK-013
status: done
revision: 1
tests: first
depends-on: [TASK-001, TASK-011]
created: 2026-10-26
---
# TASK-013: features/submit-indent — review and submission
## Files
| Path | Kind | Owner | new/edit |
|---|---|---|---|
| src/features/submit-indent/ui/SubmitIndentDialog.tsx | connected | coder | new |
| src/features/submit-indent/index.ts | public api | coder | new |
| src/features/submit-indent/ui/SubmitIndentDialog.test.tsx | test | test-engineer | new |
## Integration contract
Use getDealerSubmitPreview and submitDealerIndent; keep open on normalized error/retry; Radix Dialog 1.8.0.
## UI states
Open, filtered warning, missing-entry warning, submitting, error/retry, success.
## Acceptance
- Alert dialog focus trap/Escape/focus return.
- Full vertical warning, missing-as-zero warning and submit loading/error behavior are explicit.
## Tests
Focus lifecycle, warnings, disabled/loading submit, error remains open and retry.
## Design
Source: inputs/ux/dealer.html#app  Spec: analysis/design-spec/dealer-app.md
Route: /dealer/indent-workbook
Labels (exact, in order): Review & submit · Cancel · Submit indent · Lines · July (W1–W4) · August · September · vs last cycle's plan for July · You have filters applied. · Submitting sends your full · lines have no entry. · Review them first · Goes to
Display rules: full vertical submits; missing lines submit as zero; positive differences `+`.
## Teardown
None.
## Reflections applied
none
## Dry-run
`npm run typecheck && npm run lint && npx vitest run src/features/submit-indent`

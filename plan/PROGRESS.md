| TASK | Slice | Goal | Depends on | Status |
|---|---|---|---|---|
| TASK-001 | shared/ui | Base controls and feedback | — | done |
| TASK-002 | shared/ui/data-grid | Generic accessible data grid | — | done |
| TASK-003 | features/authenticate | Dealer sign-in form | TASK-001 | done |
| TASK-004 | pages/sign-in | Login page and route | TASK-003 | done |
| TASK-005 | features/session-actions | Theme and sign-out controls | TASK-001 | done |
| TASK-006 | widgets/app-top-bar | Authenticated navigation header | TASK-005 | done |
| TASK-007 | widgets/dealer-dashboard | Progress and attention cards | TASK-001 | done |
| TASK-008 | widgets/dealer-dashboard | Analytics cards | TASK-002, TASK-007 | done |
| TASK-009 | widgets/dealer-dashboard | Accuracy report and rollup | TASK-002, TASK-008 | done |
| TASK-010 | widgets/indent-workbook | Filters and toolbar | TASK-001 | done |
| TASK-011 | widgets/indent-workbook | Editable workbook grid | TASK-002, TASK-010 | done |
| TASK-012 | features/edit-indent | Detail and add-FERT dialogs | TASK-001, TASK-011 | done |
| TASK-013 | features/submit-indent | Review and submission dialog | TASK-001, TASK-011 | done |
| TASK-014 | features/export-indent | CSV export dialog | TASK-001 | done |
| TASK-015 | widgets/dealer-shell | Authenticated shell composition | TASK-006, TASK-009 | done |
| TASK-016 | pages/dealer-home | Dealer home route | TASK-007–009, TASK-014, TASK-015 | in-progress |
| TASK-017 | pages/indent-workbook | Indent workbook route | TASK-010–015 | in-progress |
| BUG-001 | features/authenticate | Navigate and persist session after successful login | — | done |

# UI capabilities

Detector output, verbatim except for the added `Component` column.

| Screen | Capability | Library (catalog) | Element | Evidence | Component |
|---|---|---|---|---|---|
| dealer.html | data-grid | @tanstack/react-table | `table#rollTbl.sumtbl` | 0 rows in wireframe; frozen column, sticky header, horizontal scroll | IndentRollup |
| dealer.html | data-grid | @tanstack/react-table | `table#grid.grid` | 0 rows in wireframe; frozen column, sticky header, horizontal scroll | IndentWorkbook |
| dealer.html | dialog | radix-ui (Dialog / AlertDialog) | `aside#drawer.drawer` | modal-like element "" | FertDetailDrawer |
| dealer.html | dialog | radix-ui (Dialog / AlertDialog) | `div#review.modal` | modal-like element "Review & submit  Cancel Submit i" | SubmitIndentDialog |
| dealer.html | dialog | radix-ui (Dialog / AlertDialog) | `div#addM.modal` | modal-like element "Add FERT to your indent  ⓘThese ar" | AddFertDialog |
| dealer.html | dialog | radix-ui (Dialog / AlertDialog) | `div#expM.modal` | modal-like element "Export  ⓘIn the live product this " | ExportIndentDialog |
| dealer.html | tooltip | radix-ui (Tooltip) | `button.tb-icon` | hint "Light / dark" | ThemeToggleButton |
| dealer.html | tooltip | radix-ui (Tooltip) | `button.tb-icon` | hint "Sign out" | SignOutButton |
| dealer.html | tooltip | radix-ui (Tooltip) | `button#railBtn.rail-toggle` | hint "Collapse" | FilterRail |
| dealer.html | toast | sonner | `div#toast.toast` | toast notification | ToastRegion |

## Analyzer-added rows

| Screen | Capability | Library (catalog) | Element | Evidence | Component |
|---|---|---|---|---|---|
| dealer.html | dropdown-menu | radix-ui (DropdownMenu) | `div#colPop.colpop` | Column presets and per-group Hide / Summary / Full controls; source lines 1167–1191 | ColumnChooser |
| dealer.html | toggle-group | radix-ui (ToggleGroup) | `div.seg-ctl` | Comfortable / Compact density; rollup group-by controls; source lines 1128–1131 and 1553–1555 | DensityToggle; IndentRollup |
| dealer.html | export | plain CSV (`Blob` + text) | `div#expM.modal` | Export produces CSV header and data rows; source lines 1674–1693 | ExportIndentDialog |

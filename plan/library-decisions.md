# Library decisions
Approve: change Status to `approved` (or run `node tools/task.mjs approve-libs --all-proposed`); `rejected` = no.
Only `approved` rows are installed (app-bootstrap Run L). Facts from tools/lib-facts.mjs on 2026-10-26.

| Capability | Component | Features (copied) | Decision | Install | Why | Status |
|---|---|---|---|---|---|---|
| data-grid | IndentRollup | 0 rows in wireframe; frozen column, sticky header, horizontal scroll | TanStack Table | `@tanstack/react-table@8.21.3` | Frozen/sticky behavior and horizontal scrolling; MIT, React 19, bundled types. Alternative: AG Grid Community is much heavier (20.6 MB). | approved |
| data-grid | IndentWorkbook | 0 rows in wireframe; frozen column, sticky header, horizontal scroll | TanStack Table | `@tanstack/react-table@8.21.3` | Frozen/sticky behavior and horizontal scrolling; MIT, React 19, bundled types. Alternative: AG Grid Community is much heavier (20.6 MB). | approved |
| dialog | FertDetailDrawer | modal-like element "" | Radix Dialog | `radix-ui@1.8.0` | Accessible modal/drawer primitives with focus management; MIT, React 19, bundled types. Pin is 1.8.0 because 1.8.1 was only 13 days old at fact collection. Alternative: `@radix-ui/react-dialog@1.3.0`. | approved |
| dialog | SubmitIndentDialog | modal-like element "Review & submit  Cancel Submit i" | Radix Dialog | `radix-ui@1.8.0` | Accessible modal/drawer primitives with focus management; MIT, React 19, bundled types. Pin is 1.8.0 because 1.8.1 was only 13 days old at fact collection. Alternative: `@radix-ui/react-dialog@1.3.0`. | approved |
| dialog | AddFertDialog | modal-like element "Add FERT to your indent  ⓘThese ar" | Radix Dialog | `radix-ui@1.8.0` | Accessible modal/drawer primitives with focus management; MIT, React 19, bundled types. Pin is 1.8.0 because 1.8.1 was only 13 days old at fact collection. Alternative: `@radix-ui/react-dialog@1.3.0`. | approved |
| dialog | ExportIndentDialog | modal-like element "Export  ⓘIn the live product this " | Radix Dialog | `radix-ui@1.8.0` | Accessible modal/drawer primitives with focus management; MIT, React 19, bundled types. Pin is 1.8.0 because 1.8.1 was only 13 days old at fact collection. Alternative: `@radix-ui/react-dialog@1.3.0`. | approved |
| tooltip | ThemeToggleButton | hint "Light / dark" | Radix Tooltip | `radix-ui@1.8.0` | Keyboard/focus and hover hints without relying on title attributes; MIT, React 19, bundled types. Alternative: `@radix-ui/react-tooltip@1.4.0`. | approved |
| tooltip | SignOutButton | hint "Sign out" | Radix Tooltip | `radix-ui@1.8.0` | Keyboard/focus and hover hints without relying on title attributes; MIT, React 19, bundled types. Alternative: `@radix-ui/react-tooltip@1.4.0`. | approved |
| tooltip | FilterRail | hint "Collapse" | Radix Tooltip | `radix-ui@1.8.0` | Keyboard/focus and hover hints without relying on title attributes; MIT, React 19, bundled types. Alternative: `@radix-ui/react-tooltip@1.4.0`. | approved |
| toast | ToastRegion | toast notification | Sonner | `sonner@2.0.8` | Lightweight accessible toast region; MIT, React 19, bundled types. Alternative: react-hot-toast. | approved |
| dropdown-menu | ColumnChooser | Column presets and per-group Hide / Summary / Full controls; source lines 1167–1191 | Radix DropdownMenu | `radix-ui@1.8.0` | Keyboard navigation and dismissal for a complex menu; MIT, React 19, bundled types. Alternative: `@radix-ui/react-dropdown-menu@2.2.0`. | approved |
| toggle-group | DensityToggle; IndentRollup | Comfortable / Compact density; rollup group-by controls; source lines 1128–1131 and 1553–1555 | Radix ToggleGroup | `radix-ui@1.8.0` | Accessible single-choice toggle groups; MIT, React 19, bundled types. Alternative: `@radix-ui/react-toggle-group@1.2.0`. | approved |
| export | ExportIndentDialog | Export produces CSV header and data rows; source lines 1674–1693 | native Blob + text | — | CSV and Print are explicitly plain per the catalog; no extra dependency. | approved |

## Details
### data-grid → TanStack Table
Evidence: `dealer.html` contains two tables with frozen columns, sticky headers, and horizontal scrolling. Facts: `@tanstack/react-table@8.21.3` — MIT, React 19 yes, bundled types, 13 d ago, 15,200,564 weekly downloads, 762 kB, ✔. Alternative facts: `ag-grid-community@34.3.1` — MIT, React n/a, bundled types, 40 d ago, 2,120,824 weekly downloads, 20.6 MB, ✔.

### dialog → Radix Dialog
Evidence: `aside#drawer.drawer`, `div#review.modal`, `div#addM.modal`, and `div#expM.modal` are modal-like. Facts: `radix-ui@1.8.0` — MIT, React 19 yes, bundled types, 13 d ago, 11,660,072 weekly downloads, 106 kB, ⚠ newest 1.8.1 is 13 d old → pin 1.8.0. Alternative facts: `@radix-ui/react-dialog@1.3.0` — MIT, React 19 yes, bundled types, 13 d ago, 48,321,764 weekly downloads, 107 kB, ⚠ newest 1.3.1 is 13 d old → pin 1.3.0.

### tooltip → Radix Tooltip
Evidence: three icon controls expose user-facing hints. Facts: `radix-ui@1.8.0` — MIT, React 19 yes, bundled types, 13 d ago, 11,660,072 weekly downloads, 106 kB, ⚠ newest 1.8.1 is 13 d old → pin 1.8.0. Alternative facts: `@radix-ui/react-tooltip@1.4.0` — MIT, React 19 yes, bundled types, 13 d ago, 36,673,614 weekly downloads, 143 kB, ⚠ newest 1.4.1 is 13 d old → pin 1.4.0.

### toast → Sonner
Evidence: `div#toast.toast` is a toast notification. Facts: `sonner@2.0.8` — MIT, React 19 yes, bundled types, 3 mo ago, 31,555,339 weekly downloads, 174 kB, ✔. Alternative facts: `react-hot-toast@2.6.1` — MIT, React 19 yes, bundled types, 39 d ago, 2,458,642 weekly downloads, 199 kB, ✔.

### dropdown-menu → Radix DropdownMenu
Evidence: `div#colPop.colpop` contains column presets and per-group Hide / Summary / Full controls. Facts: `radix-ui@1.8.0` — MIT, React 19 yes, bundled types, 13 d ago, 11,660,072 weekly downloads, 106 kB, ⚠ newest 1.8.1 is 13 d old → pin 1.8.0. Alternative facts: `@radix-ui/react-dropdown-menu@2.2.0` — MIT, React 19 yes, bundled types, 13 d ago, 36,840,787 weekly downloads, 103 kB, ⚠ newest 2.2.1 is 13 d old → pin 2.2.0.

### toggle-group → Radix ToggleGroup
Evidence: `div.seg-ctl` provides Comfortable / Compact density and rollup group-by controls. Facts: `radix-ui@1.8.0` — MIT, React 19 yes, bundled types, 13 d ago, 11,660,072 weekly downloads, 106 kB, ⚠ newest 1.8.1 is 13 d old → pin 1.8.0. Alternative facts: `@radix-ui/react-toggle-group@1.2.0` — MIT, React 19 yes, bundled types, 13 d ago, 28,720,802 weekly downloads, 58 kB, ⚠ newest 1.2.1 is 13 d old → pin 1.2.0.

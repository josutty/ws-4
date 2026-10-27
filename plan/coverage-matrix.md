---
stage: tasks
scope: all
generated: 2026-10-26
extractor: node tools/list-html-elements.mjs
---
# Coverage — 114 extracted elements · 114 covered · 0 missing

## Gaps (read this first)
No traceability gaps at tasks stage. Every extracted element, analysed state, API operation, data need, and detected capability has an owning TASK.

## Elements

| Screen | Extractor indices / element | Analysed component | Slice / owner | TASK | Status |
|---|---|---|---|---|---|
| login | 0 `div#login` | SignInPage | pages/sign-in / coder | TASK-004 | covered |
| login | 1 `form.lg-card` | SignInForm | features/authenticate / coder | TASK-003 | covered |
| login | 2 `h1` | SignInForm | features/authenticate / coder | TASK-003 | covered |
| login | 3 `div#fId` | SignInForm | features/authenticate / coder | TASK-003 | covered |
| login | 4 `input#lgId` | Input | shared/ui / component-generator | TASK-001 | covered |
| login | 5 `div#fPw` | SignInForm | features/authenticate / coder | TASK-003 | covered |
| login | 6 `button` Forgot password? | SignInForm | features/authenticate / coder | TASK-003 | covered |
| login | 7 `input#lgPw` | Input | shared/ui / component-generator | TASK-001 | covered |
| login | 8 `button` Sign in | SignInForm | features/authenticate / coder | TASK-003 | covered |
| login | 9 `button` Sign in with VECVNet SSO | SignInForm | features/authenticate / coder | TASK-003 | covered |
| app | 10 `div#app` | DealerAppShell | widgets/dealer-shell / coder | TASK-015 | covered |
| app | 11 `nav` | AppTopBar | widgets/app-top-bar / coder | TASK-006 | covered |
| app | 12–15 nav/status controls (4) | AppTopBar | widgets/app-top-bar / coder | TASK-006 | covered |
| app | 16 `button.tb-icon` Light / dark | ThemeToggleButton | features/toggle-theme / component-generator | TASK-005 | covered |
| app | 17 `button.tb-icon` Sign out | SignOutButton | features/sign-out / coder | TASK-005 | covered |
| app | 18 `div#vHome` | DealerHomePage | pages/dealer-home / coder | TASK-016 | covered |
| app | 19 `select#personaSel` | PrototypePersonaControl | widgets/dealer-dashboard / component-generator | TASK-007 | covered |
| app | 20–22 greeting and page actions (3) | DealerHomePage | pages/dealer-home / coder | TASK-016 | covered |
| app | 23–31 progress content/actions (9) | IndentProgressCard | widgets/dealer-dashboard / coder | TASK-007 | covered |
| app | 32–33 verticals heading/list (2) | VerticalStatusCard | widgets/dealer-dashboard / coder | TASK-007 | covered |
| app | 34–35 attention heading/list (2) | AttentionList | widgets/dealer-dashboard / coder | TASK-007 | covered |
| app | 36 vertical label | VerticalStatusCard | widgets/dealer-dashboard / coder | TASK-007 | covered |
| app | 37–42 demand signal (6) | IndentDemandSignalCard | widgets/dealer-dashboard / coder | TASK-008 | covered |
| app | 43–48 stock-age card (6) | StockOnHandCard | widgets/dealer-dashboard / coder | TASK-008 | covered |
| app | 49–53 demand-mix card (5) | DemandMixCard | widgets/dealer-dashboard / coder | TASK-008 | covered |
| app | 54 `h3` Against ABP | AbpStatusCard | widgets/dealer-dashboard / component-generator | TASK-007 | covered |
| app | 55–61 accuracy card (7) | IndentAccuracyCard | widgets/dealer-dashboard / coder | TASK-008 | covered |
| app | 62 `div#accPanel` | IndentAccuracyReport | widgets/dealer-dashboard / coder | TASK-009 | covered |
| app | 63–65 rollup controls/table (3) | IndentRollup | widgets/dealer-dashboard / coder | TASK-009 | covered |
| app | 66 `div#vWb` | IndentWorkbookPage | pages/indent-workbook / coder | TASK-017 | covered |
| app | 67–73 filter rail and controls (7) | FilterRail | widgets/indent-workbook / coder | TASK-010 | covered |
| app | 74–79 vertical/search/toolbar (6) | WorkbookToolbar | widgets/indent-workbook / coder | TASK-010 | covered |
| app | 80–81 Comfortable / Compact | DensityToggle | shared/ui / component-generator | TASK-001 | covered |
| app | 82–83 Columns button/popover | ColumnChooser | widgets/indent-workbook / coder | TASK-010 | covered |
| app | 84–89 grid and empty state (6) | IndentWorkbook | widgets/indent-workbook / coder | TASK-011 | covered |
| app | 90 `div#commit` | SubmissionFooter | widgets/indent-workbook / coder | TASK-013 | covered |
| app | 91–92 scrim/drawer (2) | FertDetailDrawer | features/edit-indent / coder | TASK-012 | covered |
| app | 93–98 review dialog/actions (6) | SubmitIndentDialog | features/submit-indent / coder | TASK-013 | covered |
| app | 99–106 add-FERT dialog (8) | AddFertDialog | features/edit-indent / coder | TASK-012 | covered |
| app | 107–112 export dialog (6) | ExportIndentDialog | features/export-indent / coder | TASK-014 | covered |
| app | 113 `div#toast` | ToastRegion | shared/ui / component-generator | TASK-001 | covered |

## UI states

| State rows | Analysed component/state | TASK UI-states row | Status |
|---|---|---|---|
| 5–10 | SignInForm: default, focus, invalid dealer code/password, submitting, error | TASK-003: Components and states; Tests | covered |
| 11–14 | DealerHomePage: loading, error, empty, success | TASK-007: UI states/tests; TASK-016: UI states/tests | covered |
| 15–18 | AppTopBar submitted states; ThemeToggleButton light/dark | TASK-005; TASK-006 UI states/tests | covered |
| 19–23 | IndentProgressCard; VerticalStatusCard status variants | TASK-007 UI states/tests | covered |
| 24–25 | AttentionList has attention/clear | TASK-007 UI states/tests | covered |
| 26–30 | IndentAccuracyReport collapsed/expanded/outlet/vehicle/empty | TASK-009 UI states/tests | covered |
| 31–36 | FilterRail expanded/collapsed/popover/no-match/saved views | TASK-010 UI states/tests | covered |
| 37–39 | WorkbookToolbar default/filtered/sorted | TASK-010 UI states/tests | covered |
| 40–43 | DensityToggle comfortable/compact; ColumnChooser closed/open | TASK-001; TASK-010 UI states/tests | covered |
| 44–52 | IndentWorkbook loading/error/empty/editable/locked/markers/paste-fill | TASK-011 UI states/tests | covered |
| 53–55 | FertDetailDrawer closed/open/close | TASK-012 UI states/tests | covered |
| 56–58 | AddFertDialog open/empty search/selection | TASK-012 UI states/tests | covered |
| 59–63 | SubmitIndentDialog open/warnings/submitting/error | TASK-013 UI states/tests | covered |
| 64–65 | ExportIndentDialog open/copy success or failure | TASK-014 UI states/tests | covered |
| 66–67 | ToastRegion visible/hidden | TASK-001 UI states/tests | covered |

## API operations

| Operation | RTK Query endpoint / defined in | Consumer | MSW handler plan | TASK | Status |
|---|---|---|---|---|---|
| GET `/users/me` `getCurrentUser` | `getCurrentUser` / entities/session/api | AppTopBar, DealerAppShell | getCurrentUser fixture/handler | TASK-006, TASK-015 | covered |
| GET `/dealers/{dealerId}/cycles/{cycleId}/summary` `getDealerCycleSummary` | `getDealerCycleSummary` / entities/dealer/api | DealerHomePage, AppTopBar, SubmitIndentDialog | fixture/handler | TASK-006, TASK-007, TASK-008, TASK-013 | covered |
| GET `/dealers/{dealerId}/cycles/{cycleId}/indent-lines` `listDealerIndentLines` | `listDealerIndentLines` / entities/indent-line/api | workbook, rollup, drawer, dashboard | fixture/handler; backend filter gaps recorded | TASK-009, TASK-011, TASK-012 | covered |
| POST `.../indent-lines` `addDealerIndentLine` | `addDealerIndentLine` / features/edit-indent/api | AddFertDialog | fixture/handler | TASK-012 | covered |
| PUT `.../indent-lines/{lineId}` `updateDealerIndentCell` | `updateDealerIndentCell` / features/edit-indent/api | IndentWorkbook | fixture/handler | TASK-011 | covered |
| PUT `.../indent-lines/batch` `batchUpdateDealerIndentCells` | `batchUpdateDealerIndentCells` / features/edit-indent/api | paste/fill-down | fixture/handler | TASK-011 | covered |
| GET `.../submit-preview` `getDealerSubmitPreview` | `getDealerSubmitPreview` / features/submit-indent/api | SubmitIndentDialog, SubmissionFooter | fixture/handler | TASK-013 | covered |
| POST `.../submit` `submitDealerIndent` | `submitDealerIndent` / features/submit-indent/api | SubmitIndentDialog | fixture/handler | TASK-013 | covered |
| POST `/auth/login` `loginDealer` (mock) | `loginDealer` / features/authenticate/api | SignInForm | MSW handler | TASK-003 | covered |
| POST `/auth/sso` `loginWithVecvnetSso` (mock) | `loginWithVecvnetSso` / features/authenticate/api | SignInForm | MSW handler | TASK-003 | covered |
| POST `/auth/password-reset` `requestPasswordReset` (mock) | `requestPasswordReset` / features/authenticate/api | SignInForm | MSW handler | TASK-003 | covered |
| GET `.../fert-catalogue` `listFertCatalogue` (mock) | `listFertCatalogue` / entities/fert-catalogue/api | AddFertDialog | MSW handler | TASK-012 | covered |
| POST `.../reopen` `reopenDealerIndent` (mock) | `reopenDealerIndent` / features/submit-indent/api | SubmissionFooter, IndentWorkbook | MSW handler | TASK-011, TASK-013 | covered |

## Data needs

| Need | Trace to endpoint or local/gap row | Consumer | TASK | Status |
|---|---|---|---|---|
| D1 authenticate dealer | `loginDealer` / proposed backend gap | SignInForm | TASK-003 | covered |
| D2 VECVNet SSO | `loginWithVecvnetSso` / proposed backend gap | SignInForm | TASK-003 | covered |
| D3 password reset | `requestPasswordReset` / proposed backend gap | SignInForm | TASK-003 | covered |
| D4 identity, role, verticals, cycle | `getCurrentUser` + `getDealerCycleSummary` | shell/dashboard | TASK-006, TASK-007, TASK-015 | covered |
| D5 workbook lines/reference data | `listDealerIndentLines`; vertical/filter gaps recorded | workbook/drawer/rollup | TASK-009, TASK-010, TASK-011, TASK-012 | covered |
| D6 quantity updates | cell + batch mutations | IndentWorkbook | TASK-011 | covered |
| D7 add catalogue FERTs | catalogue query + add mutation | AddFertDialog | TASK-012 | covered |
| D8 submit indent | preview + submit mutations | submit/progress/top bar | TASK-006, TASK-007, TASK-013 | covered |
| D9 reopen indent | `reopenDealerIndent` / proposed backend gap | workbook/footer | TASK-011, TASK-013 | covered |
| D10 CSV export | local plain Blob/text | ExportIndentDialog | TASK-014 | covered |
| D11 saved views | `workbookView` client slice | FilterRail | TASK-010 | covered |
| D12 workbook view controls | `workbookView` client slice | workbook/dashboard controls | TASK-009, TASK-010, TASK-011 | covered |
| D13 local form/modal/theme/toast state | local UI state | forms/dialogs/rail/toast | TASK-001, TASK-003, TASK-005, TASK-010, TASK-012, TASK-013, TASK-014 | covered |
| D14 derived dashboard aggregates | derived from lines/updates and display rules | dashboard/report/rollup | TASK-007, TASK-008, TASK-009 | covered |

## Capabilities

| Feature | Component | In capabilities.md | Library decision | TASK Acceptance + test line |
|---|---|---:|---:|---|
| data-grid — rollup | IndentRollup | ✔ | ✔ approved TanStack Table | TASK-009 acceptance/tests: grouped headers, frozen scroll, expansion, totals |
| data-grid — workbook | IndentWorkbook | ✔ | ✔ approved TanStack Table | TASK-011 acceptance/tests: frozen headers/column, editable cells, keyboard, totals |
| dialog — detail drawer | FertDetailDrawer | ✔ | ✔ approved Radix Dialog | TASK-012 acceptance/tests: focus trap, Escape, focus return |
| dialog — submit | SubmitIndentDialog | ✔ | ✔ approved Radix Dialog | TASK-013 acceptance/tests: alert-dialog lifecycle and loading/error |
| dialog — add FERT | AddFertDialog | ✔ | ✔ approved Radix Dialog | TASK-012 acceptance/tests: focus lifecycle, search, selection |
| dialog — export | ExportIndentDialog | ✔ | ✔ approved Radix Dialog | TASK-014 acceptance/tests: lifecycle and copy feedback |
| tooltip — theme | ThemeToggleButton | ✔ | ✔ approved Radix Tooltip | TASK-005 acceptance/tests: focus/hover tooltip |
| tooltip — sign out | SignOutButton | ✔ | ✔ approved Radix Tooltip | TASK-005 acceptance/tests: focus/hover tooltip and action |
| tooltip — collapse | FilterRail | ✔ | ✔ approved Radix Tooltip | TASK-010 acceptance/tests: Collapse tooltip on focus/hover |
| toast | ToastRegion | ✔ | ✔ approved Sonner | TASK-001 acceptance/tests: status and polite announcement |
| dropdown-menu | ColumnChooser | ✔ | ✔ approved Radix DropdownMenu | TASK-010 acceptance/tests: arrows/Enter/Escape and focus restoration |
| toggle-group — density/rollup | DensityToggle; IndentRollup | ✔ | ✔ approved Radix ToggleGroup | TASK-001/TASK-009 acceptance/tests: selected state and grouping effect |
| export — CSV | ExportIndentDialog | ✔ | ✔ approved plain Blob/text | TASK-014 acceptance/tests: escaped rows and copy feedback |

## Out of scope

None recorded. Decorative and dynamic mount points remain represented in their owning grouped element rows.

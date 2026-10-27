# UI states

| Component | State | Trigger | Expected UI | In design? |
|---|---|---|---|---|
| SignInForm | default | initial screen | dealer-code/email and password fields, primary and SSO sign-in actions | yes |
| SignInForm | focus | field receives focus | primary border and 3px soft focus ring | yes |
| SignInForm | invalid dealer code | unrecognised identifier | critical border and `⚠ We don't recognise that dealer code.` | yes |
| SignInForm | invalid password | incorrect password | critical border and `⚠ Incorrect password. 4 attempts left before the account locks.` | yes |
| SignInForm | submitting | sign-in initiated | disable submit and show loading affordance | standard (not drawn) |
| SignInForm | error | auth/reset/SSO request fails | role=alert message with retry | standard (not drawn) |
| DealerHomePage | loading | identity/dashboard first load | labelled busy region with dashboard-card skeletons | standard (not drawn) |
| DealerHomePage | error | dashboard request fails | error banner and Retry | standard (not drawn) |
| DealerHomePage | empty | no assigned verticals or dashboard data | explanatory empty message | standard (not drawn) |
| DealerHomePage | success | data loaded | greeting, progress, summary cards and rollup | yes |
| AppTopBar | not submitted | active vertical has not submitted | `Status: Not submitted` | yes |
| AppTopBar | submitted | successful submission | `Status: Submitted` success styling | yes |
| ThemeToggleButton | light | user selects light theme | light semantic token set | yes |
| ThemeToggleButton | dark | user selects dark theme or system preference | dark semantic token set | yes |
| IndentProgressCard | not submitted | active vertical unsubmitted | warning `Not submitted`, progress meter, actions | yes |
| IndentProgressCard | submitted | active vertical submitted | success `Submitted`; submitted status | yes |
| VerticalStatusCard | not started | 0 entered lines | critical `Not started` | yes |
| VerticalStatusCard | in progress | some lines entered | warning `In progress` | yes |
| VerticalStatusCard | submitted | submitted vertical | success `Submitted` | yes |
| AttentionList | has attention | no-entry, aged, swing or added line exists | count, descriptive row and `Show →` action | yes |
| AttentionList | clear | no attention items | `✓ Nothing needs your attention right now.` | yes |
| IndentAccuracyReport | collapsed | initial state | report hidden; `▸ View report card` | yes |
| IndentAccuracyReport | expanded | report-card action | outlet or vehicle accuracy table visible | yes |
| IndentAccuracyReport | outlet view | default expanded view | three outlets plus total | yes |
| IndentAccuracyReport | vehicle view | `By vehicle` selected | top 25 current-filter lines; row opens FERT | yes |
| IndentAccuracyReport | empty vehicle history | no filtered lines with offtake | `No lines with offtake history in this filter.` | yes |
| FilterRail | expanded | default | filters and footer actions visible | yes |
| FilterRail | collapsed | collapse control | 46px rail stub with count and `Filters` | yes |
| FilterRail | filter popover open | filter control activated | searchable multi-select options and counts | yes |
| FilterRail | filter search empty | no option matches | `No match` | yes |
| FilterRail | saved views empty | no saved view | saved-view select absent | yes |
| FilterRail | saved views available | view saved | saved-view select is present | yes |
| WorkbookToolbar | default | no filters/sort | results count and actions | yes |
| WorkbookToolbar | filtered | filter/search active | removable filter tokens and filtered count | yes |
| WorkbookToolbar | sorted | header sort active | `Sorted: … high→low/low→high` token | yes |
| DensityToggle | comfortable | default | standard 40px workbook rows | yes |
| DensityToggle | compact | Compact selected | 31px rows; metadata hidden | yes |
| ColumnChooser | closed | default | popover hidden | yes |
| ColumnChooser | open | `Columns` activated | presets and per-band Hide/Summary/Full controls | yes |
| IndentWorkbook | loading | workbook first load/refetch | labelled busy region and table skeleton | standard (not drawn) |
| IndentWorkbook | error | workbook request fails | error banner and Retry | standard (not drawn) |
| IndentWorkbook | empty filtered | filters return no rows | `No lines match these filters`, explanation, `Clear all filters` | yes |
| IndentWorkbook | success editable | data and active cycle available | sticky headers, frozen vehicle column, editable W1–Sep cells and total row | yes |
| IndentWorkbook | submitted/locked | submission or cut-off | quantity inputs disabled | yes |
| IndentWorkbook | no entry | line has no entered quantities | warning row marker | yes |
| IndentWorkbook | added line | user adds a catalogue FERT | purple row marker and `ADDED` tag | yes |
| IndentWorkbook | stock warning/critical | aged stock exists | age value warning/critical color | yes |
| IndentWorkbook | paste/fill-down | spreadsheet paste or Ctrl/Cmd+D | valid nonnegative cells update and toast confirms count/action | yes |
| FertDetailDrawer | closed | default | absent | yes |
| FertDetailDrawer | open | line-detail action | modal drawer with vehicle, stock, trend and last-cycle facts | yes |
| FertDetailDrawer | close | close button, scrim click or Escape | drawer and scrim removed; focus returns to opener | yes |
| AddFertDialog | open | `+ Add FERT` | searchable available catalogue and selected count | yes |
| AddFertDialog | empty search | no catalogue match | `No matching code in the catalogue.` | yes |
| AddFertDialog | selection | one or more options checked | selected count and add action | yes |
| SubmitIndentDialog | open | review action | totals, destination and submit action | yes |
| SubmitIndentDialog | filtered warning | filters active | says full vertical—not screen rows—will submit | yes |
| SubmitIndentDialog | missing-entry warning | zero-entry lines exist | says lines submit as zero and gives review action | yes |
| SubmitIndentDialog | submitting | submit action invoked | disable action and indicate progress | standard (not drawn) |
| SubmitIndentDialog | error | submission fails | error alert with retry; dialog remains open | standard (not drawn) |
| ExportIndentDialog | open | Export action | CSV text displayed with close/copy actions | yes |
| ExportIndentDialog | copy success/failure | copy action | toast confirms copied or asks user to select text | yes |
| ToastRegion | visible | mutation/local action feedback | bottom-centred message, auto-dismisses | yes |
| ToastRegion | hidden | timeout elapsed | absent/noninteractive | yes |

# Component inventory

Screens: `dealer.html#login` and `dealer.html#app`.

### SignInPage
- Screens: dealer.html#login
- Source: `div#login` (dealer.html)
- Role hint: page
- Design spec: analysis/design-spec/dealer-login.md
- Labels (verbatim): `VECVplan`; `S&OP-1A`; `Jul 2026`; `· Indent closes`; `15 Jul, 23:59 IST`; `Sign in`; `Dealer code or work email.`; `or`; `Trouble signing in? Contact Sales Planning support`; `Prototype · your role and verticals come from your account`
- Page background: `linear-gradient(150deg, #0B1822 0%, #12293A 55%, #0E3A4A 100%)`.
- Shows: branded cycle context and SignInForm in a centered 400px card.
- Props: none.
- Interactions: successful sign-in → dealer.html#app.
- A11y: `main` landmark; one h1 supplied by SignInForm; gradient is decorative.
- Responsive: centered card with 24px page padding; vertically scrolls if needed.
- Reuses: SignInForm.

### SignInForm
- Screens: dealer.html#login
- Source: `form.lg-card` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-login.md
- Labels (verbatim): `Sign in`; `Dealer code or email`; `Password`; `Forgot password?`; `Sign in`; `Sign in with VECVNet SSO`.
- Shows: dealer code/work email, password, error text, primary sign-in, password reset, and VECVNet SSO sign-in.
- Props: none.
- Form: Dealer code or email — text, required, visible error `⚠ We don't recognise that dealer code.`; Password — password, required, visible error `⚠ Incorrect password. 4 attempts left before the account locks.`; submit action authenticates.
- Interactions: primary sign-in → server auth; SSO action → SSO auth; Forgot password? → reset request.
- A11y: `form`; visible labels; `autocomplete="username"` and `current-password`; invalid fields use `aria-invalid`/described error; error uses `role="alert"`; submit disabled while submitting.
- Responsive: card remains max-width 400px.
- Reuses: Button, Input, LinkButton.

### DealerAppShell
- Screens: dealer.html#app
- Source: `div#app` (dealer.html)
- Role hint: layout
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `VECVplan`; `Home`; `Indent workbook`; `S&OP-1A ·`; `Jul 2026`; `Closes in`; `Status:`; `Sharma Motors`; `DLR-1002 · Dealer`.
- Page background: `#F4F6F8`.
- Shows: AppTopBar and switchable DealerHomePage/IndentWorkbookPage views.
- Props: `session: Session`; `cycle: PlanningCycle`.
- Interactions: navigation switches Home and Indent workbook; sign-out returns to SignInPage.
- A11y: application shell has labelled primary navigation and main content; active nav item is conveyed programmatically.
- Responsive: top bar compresses status after 900px.
- Reuses: AppTopBar, DealerHomePage, IndentWorkbookPage.

### AppTopBar
- Screens: dealer.html#app
- Source: `div.topbar` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Home`; `Indent workbook`; `S&OP-1A ·`; `Jul 2026`; `Closes in`; `Status:`; `Not submitted`; `Sharma Motors`; `DLR-1002 · Dealer`.
- Shows: brand, primary navigation, cycle/month, countdown, submission state and user identity.
- Props: `session: Session`; `cycle: PlanningCycle`; `submissionStatus: SubmissionStatus`; `onNavigate: (view: 'home' | 'workbook') => void`.
- Interactions: nav changes view; theme toggle changes preference; sign-out ends session.
- A11y: `nav`; active item uses current-page/state semantics; icon buttons have names `Light / dark` and `Sign out`.
- Responsive: hides later status segments below 900px.
- Reuses: ThemeToggleButton, SignOutButton, Button.

### ThemeToggleButton
- Screens: dealer.html#app
- Source: `button.tb-icon[title="Light / dark"]` (dealer.html)
- Role hint: presentational
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `◐`.
- Shows: current appearance toggle.
- Props: `theme: 'light' | 'dark'`; `onToggle: () => void`.
- Interactions: toggles semantic light/dark theme.
- A11y: button accessible name `Light / dark`; pressed state reflects selected theme.
- Responsive: static.
- Capabilities: tooltip — hint `Light / dark`.

### SignOutButton
- Screens: dealer.html#app
- Source: `button.tb-icon[title="Sign out"]` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `⎋`.
- Shows: sign-out icon.
- Props: `onSignOut: () => void`.
- Interactions: signs user out.
- A11y: button accessible name `Sign out`.
- Responsive: static.
- Capabilities: tooltip — hint `Sign out`.

### DealerHomePage
- Screens: dealer.html#app
- Source: `div#vHome` (dealer.html)
- Role hint: page
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Prototype control`; `Viewing as`; `Good afternoon, Sharma Motors`; `July 2026 · LMD and HD · Delhi NCR, 3 outlets`; `Indent progress`; `Summary —`; `Rollup`.
- Shows: prototype persona selector, greeting, progress cards, summaries and rollup.
- Props: `dashboard: DealerDashboard`; `workbookView: WorkbookView`.
- Interactions: Export opens ExportIndentDialog; Continue opens workbook; persona selection changes prototype persona destination; summary actions apply workbook filters.
- A11y: `main` with one h1; sections use labelled headings; selector has label.
- Responsive: cards use auto-fit min 262px; lead/full cards are one column below 760px.
- Reuses: PrototypePersonaControl, IndentProgressCard, VerticalStatusCard, AttentionList, IndentDemandSignalCard, StockOnHandCard, DemandMixCard, AbpStatusCard, IndentAccuracyCard, IndentAccuracyReport, IndentRollup.

### PrototypePersonaControl
- Screens: dealer.html#app
- Source: `div.proto-strip` (dealer.html)
- Role hint: presentational
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `PROTOTYPE CONTROL`; `Viewing as`; `Dealer — Sharma Motors`; `ASM — North Cluster`; `RSM — North Region`; `Vertical Head — LMD`; `ISO — Central Planning`; `Persona switching lives here, not in the product chrome`.
- Shows: prototype-only persona selector.
- Props: `persona: Persona`; `options: PersonaOption[]`; `onChange: (persona: Persona) => void`.
- Interactions: navigates to the selected persona prototype.
- A11y: visible label associated with native select.
- Responsive: wraps.
- Reuses: Select.

### IndentProgressCard
- Screens: dealer.html#app
- Source: `.card.lead` containing `#hcTitle` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Your July indent — LMD`; `of 52 lines entered`; `units for July`; `Not submitted`; `Auto-submits`; `15 Jul, 23:59 IST`; `Continue`; `Review & submit`.
- Shows: entered/total lines, July units, status, completion meter and cut-off.
- Props: `progress: IndentProgress`; `onContinue: () => void`; `onReview: () => void`.
- Interactions: Continue → workbook; Review & submit → SubmitIndentDialog.
- A11y: article with heading; meter exposes current/maximum progress; controls have names.
- Responsive: follows card grid.
- Reuses: StatusBadge, ProgressMeter, Button.

### VerticalStatusCard
- Screens: dealer.html#app
- Source: `.card` containing text `Your verticals` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Your verticals`; `LMD`; `HD`; `In progress`; `Not started`; `Open →`; `Both close at the same cut-off.`
- Shows: each assigned vertical, status and entered/total count.
- Props: `verticals: VerticalProgress[]`; `onOpen: (vertical: VerticalCode) => void`.
- Interactions: Open selects vertical and opens workbook.
- A11y: article/list; each open action includes the vertical name.
- Responsive: static.
- Reuses: StatusBadge, Button.

### AttentionList
- Screens: dealer.html#app
- Source: `.card` containing text `Needs attention` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Needs attention`; `lines with no entry`; `lines with stock over 180 days`; `lines more than ±20% off last cycle`; `Show →`.
- Shows: actionable counts for missing entries, aged stock, last-cycle swing and user-added lines.
- Props: `items: AttentionItem[]`; `onShow: (filter: WorkbookFilter) => void`.
- Interactions: Show applies the matching workbook filter.
- A11y: article/list; action name includes item description.
- Responsive: static.
- Reuses: Button.

### IndentDemandSignalCard
- Screens: dealer.html#app
- Source: `.card` containing text `Indent vs demand signal` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Indent vs demand signal`; `July indent`; `3-month offtake`; `against your own offtake run-rate`; `Last cycle you planned`; `for July.`
- Shows: current July indent, L3 offtake, run-rate variance and prior-cycle variance.
- Props: `signal: IndentDemandSignal`.
- Interactions: none.
- A11y: article; status text accompanies color-coded pills.
- Responsive: static.
- Reuses: StatusBadge.

### StockOnHandCard
- Screens: dealer.html#app
- Source: `.card` containing text `Stock on hand by age` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Stock on hand by age`; `units on hand`; `over 60 days`; `Under 60 days`; `60–90 days`; `90–180 days`; `Over 180 days`; `Show over 180 days →`.
- Shows: stock total, aged total, four age bands and proportion bar.
- Props: `stock: StockAgeSummary`; `onShowOver180Days: () => void`.
- Interactions: action applies the over-180-days filter.
- A11y: article; bar has text alternative listing each band/value; action has clear name.
- Responsive: static.
- Reuses: Button.

### DemandMixCard
- Screens: dealer.html#app
- Source: `.card` containing text `Demand mix — Runner / Repeater / Stranger` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Demand mix — Runner / Repeater / Stranger`; `FERTs in your July indent`; `Runner`; `Repeater`; `Stranger`; `Vehicles in your July indent`.
- Shows: number of FERTs and unit/line distribution by demand segment.
- Props: `mix: DemandMixSummary`.
- Interactions: none.
- A11y: article; visualization is accompanied by text legend and values.
- Responsive: static.

### AbpStatusCard
- Screens: dealer.html#app
- Source: `.card` containing text `Against ABP` (dealer.html)
- Role hint: presentational
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Against ABP`; `Not yet available`; `Dealer-level ABP targets are being introduced this year and aren't reliable enough to score against. Your ASM sees the cluster figure.`
- Shows: unavailable dealer-level ABP explanation.
- Props: none.
- Interactions: none.
- A11y: article with heading.
- Responsive: static.

### IndentAccuracyCard
- Screens: dealer.html#app
- Source: `.card.full` containing text `Your indent accuracy` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Your indent accuracy`; `4-cycle average`; `bias`; `Indent`; `offtake`; `Monthly, across all outlets and vehicles, Mar–Jun. Tolerance is ±10%.`; `▸ View report card`.
- Shows: accuracy average, over/under bias, monthly spark bars and explanatory definition.
- Props: `accuracy: IndentAccuracySummary`; `expanded: boolean`; `onToggle: () => void`.
- Interactions: toggles IndentAccuracyReport.
- A11y: article; spark visualization has equivalent month/value text; toggle exposes expanded state.
- Responsive: wraps values and chart.
- Reuses: StatusBadge, Button.

### IndentAccuracyReport
- Screens: dealer.html#app
- Source: `div#accPanel` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Indent accuracy — last four cycles`; `By outlet`; `By vehicle`; `Monthly`; `Outlet`; `Vehicle`; `Accuracy`; `Bias`; `Indent`; `Offtake`.
- Shows: outlet or top-25 vehicle four-cycle indent/offtake history, accuracy and bias.
- Props: `outlets: OutletAccuracy[]`; `fertAccuracy: FertAccuracy[]`; `view: 'outlet' | 'fert'`; `onViewChange: (view: 'outlet' | 'fert') => void`; `onOpenFert: (fertCode: string) => void`.
- Interactions: changes view; vehicle row filters workbook to that FERT.
- A11y: table with row/column headers; selected view is programmatically exposed; clickable rows have buttons/links rather than row click alone.
- Responsive: horizontal table scroll.
- Reuses: ToggleGroup, DataTable.
- Capabilities: data-grid — grouped headers, expandable rows and totals.

### IndentRollup
- Screens: dealer.html#app
- Source: `table#rollTbl.sumtbl` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Group by`; `Vertical`; `Sub-vertical`; `MPG`; `Tonnage`; `AC / Non-AC`; `Segment`; `FERT`; `YOUR INDENT · JULY 2026`; `W1`; `W2`; `W3`; `W4`; `JUL`; `AUG`; `SEP`; `TOTAL`; `Demand mix`; `Stock`; `Off L3`; `Ret L3`; `Δ vs last`; `Total`.
- Shows: group-by rollup with monthly indent, demand mix, stock, trends, last-cycle delta and total rows.
- Props: `rows: IndentLine[]`; `groupBy: RollupGroup`; `bandModes: RollupBandModes`; `expandedGroups: string[]`; `onGroupByChange: (group: RollupGroup) => void`; `onBandModeChange: (band: string) => void`; `onGroupToggle: (group: string) => void`.
- Interactions: changes grouping; expands a group; expands/collapses reference groups.
- A11y: semantic table with two header rows; expand controls use names/state; summary is not color-only.
- Responsive: horizontal scroll.
- Reuses: ToggleGroup, DataTable.
- Capabilities: data-grid — frozen column, sticky header, horizontal scroll, grouped headers, expandable grouped rows, totals.

### IndentWorkbookPage
- Screens: dealer.html#app
- Source: `div#vWb` (dealer.html)
- Role hint: page
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Filters`; `Clear all`; `Save view`; `LMD`; `HD`; `Search code or description`; `+ Add FERT`; `Export`; `Comfortable`; `Compact`; `☷ Columns`; `Review & submit`.
- Shows: FilterRail, toolbar, editable IndentWorkbook and submission footer.
- Props: `vertical: VerticalCode`; `workbook: IndentWorkbookData`.
- Interactions: all workbook filters and editing; vertical selection resets filters/search/sort.
- A11y: page main has labelled filter aside and labelled workbook table.
- Responsive: rail overlays at max-width 900px; grid horizontally scrolls.
- Reuses: FilterRail, WorkbookToolbar, IndentWorkbook, SubmissionFooter.

### FilterRail
- Screens: dealer.html#app
- Source: `aside#rail` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Filters`; `Vertical`; `FERT`; `Sub-vertical`; `Demand segment`; `MPG model`; `Tonnage`; `Fuel`; `Cabin`; `FERT History`; `Status`; `Clear all`; `Save view`; `Saved views`; `Search fert…`; `Paste a list of codes from a spreadsheet to select many at once.`
- Shows: collapsible, searchable multi-select filters with result counts and saved views.
- Props: `filters: WorkbookFilters`; `savedViews: SavedWorkbookView[]`; `onChange: (filters: WorkbookFilters) => void`; `onSaveView: () => void`; `onApplyView: (viewId: string) => void`; `onCollapse: () => void`.
- Interactions: choose/clear filters; paste FERT codes; save/apply views; collapse rail.
- A11y: `aside` labelled Filters; each filter has visible label; popover controls announce selection count; collapse button name changes.
- Responsive: overlays at ≤900px; collapsed width 46px.
- Reuses: MultiSelectFilter, Button, Select.
- Capabilities: tooltip — collapse hint `Collapse`.

### WorkbookToolbar
- Screens: dealer.html#app
- Source: `div.strip` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `LMD`; `HD`; `Search code or description`; `+ Add FERT`; `Export`; `Comfortable`; `Compact`; `☷ Columns`; `Clear all`.
- Shows: vertical select, search, active filter/sort tokens, result count and workbook actions.
- Props: `vertical: VerticalCode`; `query: string`; `activeFilters: FilterToken[]`; `resultCount: number`; `totalCount: number`; `density: 'comfortable' | 'compact'`; `onQueryChange: (query: string) => void`; `onVerticalChange: (vertical: VerticalCode) => void`.
- Interactions: removes tokens, clears filters, opens add/export/column controls and changes density.
- A11y: search has label; token remove buttons name the removed filter; result count is live text.
- Responsive: horizontal scrolling toolbar; search narrows to 160px at ≤900px.
- Reuses: Select, Input, DensityToggle, ColumnChooser, Button.

### DensityToggle
- Screens: dealer.html#app
- Source: `div.seg-ctl` containing `#dnComf` / `#dnComp` (dealer.html)
- Role hint: presentational
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Comfortable`; `Compact`.
- Shows: one selected row-density option.
- Props: `value: 'comfortable' | 'compact'`; `onChange: (value: 'comfortable' | 'compact') => void`.
- Interactions: changes row height and metadata visibility.
- A11y: labelled single-choice toggle group; selected value exposed with `aria-pressed`/radio semantics.
- Responsive: static.
- Capabilities: toggle-group — `Comfortable` / `Compact` is one density choice.

### ColumnChooser
- Screens: dealer.html#app
- Source: `div#colPop.colpop` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Presets`; `Essentials`; `Stock focus`; `Trends`; `Everything`; `Column groups`; `Hide`; `Summary`; `Full`; `Click any group header in the grid to expand or collapse it.`
- Shows: column-group presets and Hide/Summary/Full mode per group.
- Props: `preset: ColumnPreset | null`; `bandModes: ColumnBandModes`; `onPresetChange: (preset: ColumnPreset) => void`; `onBandModeChange: (band: string, mode: BandMode) => void`.
- Interactions: opens from Columns, selects preset/mode, dismisses on outside click/Escape.
- A11y: menu/popover with labelled grouped controls; retains trigger focus on close.
- Responsive: 318px panel anchored to trigger.
- Reuses: ToggleGroup, Button.
- Capabilities: dropdown-menu — presets and column-group controls; column-visibility — Hide/Summary/Full column groups.

### IndentWorkbook
- Screens: dealer.html#app
- Source: `table#grid.grid` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Vehicle`; `FERT code`; `Vehicle attributes`; `Current dealer stock`; `Opening & live POs`; `Pipeline`; `Trend — offtake`; `Trend — retail`; `Last cycle`; `Your indent · July 2026`; `W1`; `W2`; `W3`; `W4`; `Jul`; `Aug`; `Sep`; `Total`; `No lines match these filters`; `Clear all filters`.
- Shows: sticky grouped headers, frozen vehicle column, reference bands, editable W1–Sep quantities, calculated Jul/Total and visible/filtered total.
- Props: `lines: IndentLine[]`; `columnModes: ColumnBandModes`; `sort: SortState`; `submitted: boolean`; `onEdit: (fertCode: string, period: IndentPeriod, quantity: number) => void`; `onSort: (column: string) => void`; `onOpenDetail: (fertCode: string) => void`; `onPaste: (start: CellAddress, values: number[][]) => void`; `onFillDown: (cell: CellAddress) => void`.
- Interactions: sort; cycle header band; edit quantities; arrow/Enter cell navigation; paste matrix; Ctrl/Cmd+D fill-down; line detail opens drawer.
- A11y: semantic table with two header rows; frozen implementation must not duplicate accessible cells; inputs have column/row-derived labels; empty state is announced; loading uses `aria-busy`.
- Responsive: horizontal scroll; min-width 960px; 31px compact rows.
- Reuses: DataTable, NumberInput, StatusBadge, FertDetailDrawer.
- Capabilities: data-grid — frozen/sticky vehicle column and header, grouped/collapsible headers, sortable columns, 6 editable cells per row, previous `was <value>` value, visible/filtered totals, horizontal scrolling.

### SubmissionFooter
- Screens: dealer.html#app
- Source: `div#commit` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `lines`; `units · July`; `Jul–Sep`; `with no entry`; `Saved just now`; `Filtered-view total · submission still includes all`; `Review & submit`; `View what was sent`; `Reopen`.
- Shows: line/quantity totals, missing-entry count, save state and submit/reopen actions.
- Props: `summary: SubmissionSummary`; `submitted: boolean`; `filtered: boolean`; `onReview: () => void`; `onExport: () => void`; `onReopen: () => void`.
- Interactions: Review opens submission dialog; export opens export dialog; reopen mutation unlocks pre-cut-off.
- A11y: footer/status region; actions have clear names.
- Responsive: horizontal scroll.
- Reuses: Button.

### FertDetailDrawer
- Screens: dealer.html#app
- Source: `aside#drawer[aria-label="Line detail"]` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Line detail`; `Vehicle`; `Your segment`; `Eicher segment`; `MPG model`; `Tonnage`; `Fuel · cabin`; `Sub-vertical`; `Your stock on hand`; `Under 60 days`; `60–90 days`; `90–180 days`; `Over 180 days`; `Opening stock, 1 Jul`; `Live purchase orders`; `Offtake and retail`; `Last cycle, for this month`; `Close`.
- Shows: line identity, segments, vehicle attributes, stock, trends, refresh timestamps and current/prior quantities.
- Props: `line: IndentLine | null`; `open: boolean`; `onOpenChange: (open: boolean) => void`.
- Interactions: opens from line info action; closes from Close, scrim or Escape.
- A11y: modal dialog/drawer with label, focus trap, Escape close and focus return; values use definition list/table semantics.
- Responsive: width 396px, max 92vw.
- Capabilities: dialog — modal drawer; tooltip — line-info hint `Line detail`.

### AddFertDialog
- Screens: dealer.html#app
- Source: `div#addM.modal` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Add FERT to your indent`; `These are codes you haven't ordered in the last 12 months, so they aren't in your list. Added lines are flagged for your ASM.`; `Search code or description…`; `None selected`; `Cancel`; `Add selected`; `No matching code in the catalogue.`
- Shows: eligible not-currently-listed catalogue FERTs, search and multi-selection count.
- Props: `vertical: VerticalCode`; `catalogue: FertCatalogueItem[]`; `existingCodes: string[]`; `selectedCodes: string[]`; `onConfirm: (codes: string[]) => void`; `onOpenChange: (open: boolean) => void`.
- Interactions: filters, selects/deselects catalogue items, adds selections to indent, cancels.
- A11y: modal dialog with labelled search and multiselect choices; focus trapped and restored.
- Responsive: max-width 480px.
- Reuses: Dialog, Input, Button.
- Capabilities: dialog — modal multi-select flow.

### SubmitIndentDialog
- Screens: dealer.html#app
- Source: `div#review.modal` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Review & submit`; `Cancel`; `Submit indent`; `Lines`; `July (W1–W4)`; `August`; `September`; `vs last cycle's plan for July`; `You have filters applied.`; `You have filters applied. Submitting sends your full`; `lines have no entry.`; `Review them first`; `Goes to`.
- Shows: cycle/dealer/vertical context, filtered/missing/added notices, monthly totals, comparison and destination.
- Props: `summary: SubmissionReview`; `open: boolean`; `isSubmitting: boolean`; `error?: ApiError`; `onSubmit: () => void`; `onOpenChange: (open: boolean) => void`; `onReviewMissing: () => void`.
- Interactions: submit full vertical indent; cancel; review missing lines.
- A11y: alert dialog with focus trap/Escape/focus return; notices and error use `role="alert"`; submit disabled while submitting.
- Responsive: max-width 480px.
- Reuses: AlertDialog, Button, Notice.
- Capabilities: dialog — submit confirmation with blocking consequences.

### ExportIndentDialog
- Screens: dealer.html#app
- Source: `div#expM.modal` (dealer.html)
- Role hint: connected
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Export`; `In the live product this downloads a file. Here it's on screen so you can check the shape — select all and copy.`; `Close`; `Copy to clipboard`.
- Shows: CSV representation of current full or filtered export scope.
- Props: `csv: string`; `scopeLabel: string`; `open: boolean`; `onCopy: () => void`; `onOpenChange: (open: boolean) => void`.
- Interactions: copy CSV; close; live product downloads CSV.
- A11y: dialog; readonly textarea labelled as CSV export; copy feedback announced via ToastRegion.
- Responsive: max-width 560px.
- Reuses: Dialog, Button, Textarea.
- Capabilities: dialog — export modal; export — plain CSV download/copy flow.

### ToastRegion
- Screens: dealer.html#app, dealer.html#login
- Source: `div#toast.toast` (dealer.html)
- Role hint: presentational
- Design spec: analysis/design-spec/dealer-app.md
- Labels: dynamic messages, including `View saved`, `Copied to clipboard`, `LMD indent submitted to ASM North Cluster`.
- Shows: one transient action confirmation.
- Props: `message?: string`.
- Interactions: appears after feedback events and auto-dismisses after 2600ms.
- A11y: `role="status"`, `aria-live="polite"`; not focusable.
- Responsive: max content width, centered above footer.
- Capabilities: toast — transient notification.

### Button
- Screens: dealer.html#login, dealer.html#app
- Source: `button.btn` (dealer.html)
- Role hint: presentational
- Design spec: analysis/design-spec/dealer-login.md; analysis/design-spec/dealer-app.md
- Labels: varies; exact instances are listed in consuming blocks and design specs.
- Shows: primary, ghost, quiet, add and small variants.
- Props: `children: ReactNode`; `variant: 'primary' | 'ghost' | 'quiet' | 'add'`; `size?: 'default' | 'sm'`; `disabled?: boolean`; `onClick?: () => void`.
- Interactions: invokes supplied action.
- A11y: native button; disabled uses `disabled`; all icon-only use an accessible name.
- Responsive: static.

### Input
- Screens: dealer.html#login, dealer.html#app
- Source: `input#lgId, input#lgPw, input#qBox, input#addQ, input.cellin` (dealer.html)
- Role hint: presentational
- Design spec: analysis/design-spec/dealer-login.md; analysis/design-spec/dealer-app.md
- Labels (verbatim): `Dealer code or email`; `Password`; `Search code or description`; `Search code or description…`.
- Shows: text/password/search/number input styles.
- Props: `label?: string`; `type: 'text' | 'password' | 'search' | 'number'`; `value: string | number`; `invalid?: boolean`; `error?: string`; `disabled?: boolean`; `onChange: (value: string) => void`.
- Interactions: input updates supplied state.
- A11y: visible label where applicable; invalid fields bind to error text; numeric workbook cells receive derived labels.
- Responsive: static.

### Select
- Screens: dealer.html#app
- Source: `select#personaSel, select#vertSel` (dealer.html)
- Role hint: presentational
- Design spec: analysis/design-spec/dealer-app.md
- Labels (verbatim): `Viewing as`; `LMD`; `HD`.
- Shows: native select styling.
- Props: `label?: string`; `value: string`; `options: SelectOption[]`; `onChange: (value: string) => void`.
- Interactions: selects one option.
- A11y: native select with visible label.
- Responsive: static.

### Decorative

| Extractor indices | Element(s) | Reason |
|---|---|---|
| 23, 25–29, 33, 35–36, 38–42, 44–47, 50–53, 56–60, 62–65, 68, 70–71, 76–77, 83–88, 90–91, 95–96, 101, 103–104, 109–110, 113 | Dynamic mount points, counters, bars, table sections, scrim or toast container; their rendered content belongs to the named component blocks above and they do not form an independently reusable component. |
| 14–15 | Countdown/status text mount points | Content belongs to AppTopBar. |
| 18, 66, 84–87 | View/table structural wrappers | Layout only; functionality is covered by DealerHomePage, IndentWorkbookPage and IndentWorkbook. |
| 0, 10 | Screen root containers | Page/layout roots represented by SignInPage and DealerAppShell. |
| 7, 16–17, 29, 46–47, 51–52, 69, 80–81, 102, 110 | Glyphs, bars, avatar/detail values, and other visual or dynamic fragments | Decorative or rendered within their owning component; no standalone semantics. |

## Extractor allocation

Every line from `tools/list-html-elements.mjs inputs/ux/dealer.html` is allocated above: 0–9 SignInPage/SignInForm; 10–17 DealerAppShell/AppTopBar; 18–65 DealerHomePage and its child blocks; 66–90 IndentWorkbookPage and its child blocks; 91–92 FertDetailDrawer; 93–98 SubmitIndentDialog; 99–106 AddFertDialog; 107–112 ExportIndentDialog; 113 ToastRegion. The Decorative table records structural/dynamic fragments rather than dropping them.

## Open questions

1. Q1 (client): Which production identity provider/protocol implements `Sign in with VECVNet SSO`, and is password authentication retained for every persona?
2. Q2 (client): Is password reset in scope and what confirmation/error response is required after `Forgot password?`?
3. Q3 (client): Should saved filter views and the selected theme persist across browser sessions, or only while the workbench is open?
4. Q4 (client): The prototype allows `Reopen` after submission, while the FSD says the dealer tier locks at cut-off. What authorization and audit rule governs reopen before the cut-off?
5. Q5 (client): The FSD requires zero-quantity line items to be hidden in indent templates, but the prototype renders zero-entry lines for review. Which rule governs initial visibility versus review/submission?
6. Q6 (client): Are `Runner`, `Repeater`, and `Stranger` supplied classifications, and what business definitions govern them?
7. Q7 (client): Is the difference between `Your segment` and `Eicher segment` an expected business condition, and what action (if any) should it require?
8. Q8 (client): The HTML calls the next approver `ASM North Cluster`; the FSD uses CSM/ASM and notes a configurable future ASM layer. What exact role/name should the dealer submission target use?
9. Q9 (client): What are the source, refresh SLA and authorization rules for stock, live POs, offtake, retail and indent-accuracy history?
10. Q10 (client): Do the ±15% run-rate, ±10% accuracy, and 80%/90% accuracy color thresholds represent approved business rules or prototype-only display rules?

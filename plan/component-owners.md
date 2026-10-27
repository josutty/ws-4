# Component ownership

| Component | Slice / segment | Kind | Owner | Depends on (must obey import matrix) |
|---|---|---|---|---|
| SignInPage | pages/sign-in/ui | page | coder | shared/ui, features/authenticate |
| SignInForm | features/authenticate/ui | connected | coder | shared/ui, features/authenticate api |
| DealerAppShell | widgets/dealer-shell/ui | page | coder | widgets/app-top-bar, widgets/dealer-dashboard, widgets/indent-workbook |
| AppTopBar | widgets/app-top-bar/ui | connected | coder | entities/session, entities/planning-cycle, features/sign-out, features/toggle-theme, shared/ui |
| ThemeToggleButton | features/toggle-theme/ui | presentational | component-generator | shared/ui |
| SignOutButton | features/sign-out/ui | connected | coder | entities/session, shared/ui |
| DealerHomePage | pages/dealer-home/ui | page | coder | widgets/dealer-dashboard, features/manage-workbook-view |
| PrototypePersonaControl | widgets/dealer-dashboard/ui | presentational | component-generator | shared/ui |
| IndentProgressCard | widgets/dealer-dashboard/ui | connected | coder | entities/dealer, entities/indent-line, shared/ui |
| VerticalStatusCard | widgets/dealer-dashboard/ui | connected | coder | entities/dealer, shared/ui |
| AttentionList | widgets/dealer-dashboard/ui | connected | coder | entities/indent-line, features/manage-workbook-view, shared/ui |
| IndentDemandSignalCard | widgets/dealer-dashboard/ui | connected | coder | entities/dealer, shared/ui |
| StockOnHandCard | widgets/dealer-dashboard/ui | connected | coder | entities/dealer, shared/ui |
| DemandMixCard | widgets/dealer-dashboard/ui | connected | coder | entities/dealer, shared/ui |
| AbpStatusCard | widgets/dealer-dashboard/ui | presentational | component-generator | shared/ui |
| IndentAccuracyCard | widgets/dealer-dashboard/ui | connected | coder | entities/dealer, shared/ui |
| IndentAccuracyReport | widgets/dealer-dashboard/ui | connected | coder | entities/dealer, features/manage-workbook-view, shared/ui |
| IndentRollup | widgets/dealer-dashboard/ui | connected | coder | entities/indent-line, features/manage-workbook-view, shared/ui, TanStack Table |
| IndentWorkbookPage | pages/indent-workbook/ui | page | coder | widgets/indent-workbook, features/edit-indent, features/submit-indent |
| FilterRail | widgets/indent-workbook/ui | connected | coder | features/manage-workbook-view, entities/indent-line, shared/ui, Radix Tooltip |
| WorkbookToolbar | widgets/indent-workbook/ui | connected | coder | features/manage-workbook-view, shared/ui |
| DensityToggle | shared/ui | presentational | component-generator | Radix ToggleGroup |
| ColumnChooser | widgets/indent-workbook/ui | connected | coder | features/manage-workbook-view, shared/ui, Radix DropdownMenu |
| IndentWorkbook | widgets/indent-workbook/ui | connected | coder | entities/indent-line, features/edit-indent, features/manage-workbook-view, shared/ui, TanStack Table |
| SubmissionFooter | widgets/indent-workbook/ui | connected | coder | entities/indent-line, features/submit-indent, features/export-indent, shared/ui |
| FertDetailDrawer | features/edit-indent/ui | connected | coder | entities/indent-line, shared/ui, Radix Dialog |
| AddFertDialog | features/edit-indent/ui | connected | coder | entities/fert-catalogue, entities/indent-line, shared/ui, Radix Dialog |
| SubmitIndentDialog | features/submit-indent/ui | connected | coder | entities/dealer, entities/planning-cycle, features/submit-indent api, shared/ui, Radix Dialog |
| ExportIndentDialog | features/export-indent/ui | connected | coder | features/export-indent lib, shared/ui, Radix Dialog |
| ToastRegion | shared/ui | presentational | component-generator | Sonner |
| Button | shared/ui | presentational | component-generator | — |
| Input | shared/ui | presentational | component-generator | — |
| Select | shared/ui | presentational | component-generator | — |

## Non-component work

| Work | Owner |
|---|---|
| `baseApi`, injected endpoint files, client slices and store root | store-architect |
| semantic tokens, Tailwind theme and theme application | styling-engineer |
| providers, router, app composition and route registration | app-bootstrap; page TASKs add their route rows |
| MSW handlers, fixtures and error scenarios | mock-data-generator |

The eight presentational components are `ThemeToggleButton`, `PrototypePersonaControl`,
`AbpStatusCard`, `DensityToggle`, `ToastRegion`, `Button`, `Input`, and `Select` (8 total;
the count includes all rows marked presentational). The connected count is 22 and page count
is 3, for 33 analysed components.

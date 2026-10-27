# FSD structure

The implementation is scoped to the analysed dealer prototype (`dealer.html#login` and
`dealer.html#app`). The broader FSD document defines the future thirteen-persona platform,
but supplies no client layer/slice names; the rows below therefore use AGENTS.md defaults and
do not invent screens for the unanalysed personas.

## pages/
- `pages/sign-in/` — `ui/SignInPage.tsx`; route `/login`; composes `SignInForm`.
- `pages/dealer-home/` — `ui/DealerHomePage.tsx`; route `/dealer/home`; composes dashboard widgets.
- `pages/indent-workbook/` — `ui/IndentWorkbookPage.tsx`; route `/dealer/indent-workbook`; composes workbook widgets.

## widgets/
- `widgets/dealer-shell/` — `ui/DealerAppShell.tsx`; authenticated shell and view composition.
- `widgets/app-top-bar/` — `ui/AppTopBar.tsx`; cycle, identity, navigation and status.
- `widgets/dealer-dashboard/` — `ui/IndentProgressCard.tsx`, `VerticalStatusCard.tsx`, `AttentionList.tsx`, `IndentDemandSignalCard.tsx`, `StockOnHandCard.tsx`, `DemandMixCard.tsx`, `AbpStatusCard.tsx`, `IndentAccuracyCard.tsx`, `IndentAccuracyReport.tsx`, `IndentRollup.tsx`; dashboard summaries and rollup.
- `widgets/indent-workbook/` — `ui/FilterRail.tsx`, `WorkbookToolbar.tsx`, `ColumnChooser.tsx`, `IndentWorkbook.tsx`, `SubmissionFooter.tsx`; filterable/editable workbook block.

## features/
- `features/authenticate/` — `api/` login, SSO and password-reset mutations; `ui/SignInForm.tsx`.
- `features/sign-out/` — `ui/SignOutButton.tsx`; clears authenticated session.
- `features/toggle-theme/` — `ui/ThemeToggleButton.tsx`; local theme preference action.
- `features/manage-workbook-view/` — `model/workbookViewSlice.ts`; filters, saved views, density, columns, sorting and rollup/report UI state.
- `features/edit-indent/` — `ui/FertDetailDrawer.tsx`, `ui/AddFertDialog.tsx`; `api/` add-line, cell and batch-cell mutations.
- `features/submit-indent/` — `ui/SubmitIndentDialog.tsx`; `api/` submit and reopen mutations.
- `features/export-indent/` — `ui/ExportIndentDialog.tsx`; plain CSV generation/copy UI.

## entities/
- `entities/session/` — `model/sessionSlice.ts`; authenticated session and current-user state; public `index.ts`.
- `entities/dealer/` — `api/dealerApi.ts`; current cycle summary query; public `index.ts`.
- `entities/planning-cycle/` — `api/planningCycleApi.ts`; cycle context from summary/current-user data; public `index.ts`.
- `entities/indent-line/` — `api/indentLineApi.ts`; list lines query and workbook line models; public `index.ts`.
- `entities/fert-catalogue/` — `api/fertCatalogueApi.ts`; eligible FERT catalogue query; public `index.ts`.

## shared/
- `shared/api/` — `baseApi`, normalized errors and generated schema types.
- `shared/ui/` — `Button`, `Input`, `Select`, `DensityToggle`, `ToastRegion`, plus status, table, dialog and feedback primitives; public `index.ts`.
- `shared/lib/` — CSV/formatting helpers and typed store hooks.
- `shared/config/` — environment and route constants.

`mocks/` contains MSW handlers/fixtures outside FSD. `src/app/` owns providers, store
composition, router and global CSS only.

## Client FSD compliance

| Client doc section | Requirement | Where planned | Status (as specified / added by us / conflict) |
|---|---|---|---|
| §2 Scope | Phase 0 dealer workflow includes dealer FERT indent, dashboard and submission | pages/dealer-home, pages/indent-workbook, dealer widgets/features | as specified |
| §3 Personas | Dealer data is isolated to the authenticated dealership | entities/session, entities/dealer, authenticated routes | as specified |
| §6.1 Screen design | Dense workbook with frozen columns, reference bands and editable inputs | widgets/indent-workbook + features/edit-indent | as specified |
| §6.3 Approval chain | Cut-off, auto-submit, locking and status presentation | entities/planning-cycle, widgets/app-top-bar, features/submit-indent | as specified |
| §6.4 and §6.4 EPS | Future ISO/COCO/IB/IS/NPI/EPS screens | not planned in this dealer-scoped analysis | out of analysed scope; no conflict |
| Open items | Password reset/SSO protocol and persistence/reopen rules remain unresolved | authenticate and submit APIs expose the documented UX states without assuming protocol | as specified |

Every slice has a public `index.ts`; consumers use public APIs only. No same-layer slice
imports another same-layer slice, and pages remain composition-only.

## Public slice exports

| Slice | `index.ts` exports |
|---|---|
| `pages/sign-in` | `SignInPage` |
| `pages/dealer-home` | `DealerHomePage` |
| `pages/indent-workbook` | `IndentWorkbookPage` |
| `widgets/dealer-shell` | `DealerAppShell` |
| `widgets/app-top-bar` | `AppTopBar` |
| `widgets/dealer-dashboard` | `PrototypePersonaControl`, `IndentProgressCard`, `VerticalStatusCard`, `AttentionList`, `IndentDemandSignalCard`, `StockOnHandCard`, `DemandMixCard`, `AbpStatusCard`, `IndentAccuracyCard`, `IndentAccuracyReport`, `IndentRollup` |
| `widgets/indent-workbook` | `FilterRail`, `WorkbookToolbar`, `ColumnChooser`, `IndentWorkbook`, `SubmissionFooter` |
| `features/authenticate` | `SignInForm`, auth hooks |
| `features/sign-out` | `SignOutButton` |
| `features/toggle-theme` | `ThemeToggleButton` |
| `features/manage-workbook-view` | `workbookViewSlice`, selectors and action creators |
| `features/edit-indent` | `FertDetailDrawer`, `AddFertDialog`, edit hooks |
| `features/submit-indent` | `SubmitIndentDialog`, submit/reopen hooks |
| `features/export-indent` | `ExportIndentDialog`, CSV helper |
| `entities/session` | `sessionSlice`, session selectors |
| `entities/dealer` | dealer query hooks and models |
| `entities/planning-cycle` | cycle query hooks and models |
| `entities/indent-line` | indent-line query hooks and models |
| `entities/fert-catalogue` | catalogue query hooks and models |
| `shared/ui` | `Button`, `Input`, `Select`, `DensityToggle`, `ToastRegion` and shared primitives |

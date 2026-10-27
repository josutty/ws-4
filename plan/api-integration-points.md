# API integration points

| operationId | Mock? | RTK Query endpoint | Type | Defined in | Tags provides / invalidates | Consumers | Error UX |
|---|---|---|---|---|---|---|---|
| getCurrentUser | real | getCurrentUser | query | entities/session/api | Session | AppTopBar, DealerAppShell | auth failure redirects to sign-in; retry banner |
| getDealerCycleSummary | real | getDealerCycleSummary | query | entities/dealer/api | DealerSummary, Cycle | DealerHomePage, AppTopBar, SubmitIndentDialog | error banner + retry |
| listDealerIndentLines | real | listDealerIndentLines | query | entities/indent-line/api | IndentLine LIST + ids | IndentWorkbook, IndentRollup, FertDetailDrawer, dashboard | error banner + retry; empty filtered state |
| addDealerIndentLine | real | addDealerIndentLine | mutation | features/edit-indent/api | invalidates IndentLine LIST | AddFertDialog | inline dialog error + retry |
| updateDealerIndentCell | real | updateDealerIndentCell | mutation | features/edit-indent/api | invalidates IndentLine id/LIST | IndentWorkbook | cell error/status toast |
| batchUpdateDealerIndentCells | real | batchUpdateDealerIndentCells | mutation | features/edit-indent/api | invalidates IndentLine LIST | IndentWorkbook paste/fill-down | error banner/toast + retry |
| getDealerSubmitPreview | real | getDealerSubmitPreview | query | features/submit-indent/api | SubmitPreview | SubmitIndentDialog, SubmissionFooter | dialog error + retry |
| submitDealerIndent | real | submitDealerIndent | mutation | features/submit-indent/api | invalidates DealerSummary, Cycle, IndentLine LIST, SubmitPreview | SubmitIndentDialog | alert in dialog; keep open for retry |
| loginDealer | mock | loginDealer | mutation | features/authenticate/api | invalidates Session | SignInForm | field-specific alert and retry |
| loginWithVecvnetSso | mock | loginWithVecvnetSso | mutation | features/authenticate/api | invalidates Session | SignInForm | alert and retry |
| requestPasswordReset | mock | requestPasswordReset | mutation | features/authenticate/api | — | SignInForm | alert or success confirmation |
| listFertCatalogue | mock | listFertCatalogue | query | entities/fert-catalogue/api | FertCatalogue LIST | AddFertDialog | dialog error + retry; no-match empty |
| reopenDealerIndent | mock | reopenDealerIndent | mutation | features/submit-indent/api | invalidates DealerSummary, Cycle, IndentLine LIST | SubmissionFooter, IndentWorkbook | action error + retry |

The list-lines operation carries the generated backend gaps for vertical and complete
workbook-filter/sort parameters; the endpoint remains one query with an object parameter.
All errors normalize to `ApiError` and use `getErrorMessage`.

## Client global state

| Slice | File | Fields | Consumers |
|---|---|---|---|
| `session` | `entities/session/model/sessionSlice.ts` | authenticated user, token/session status | AppTopBar, SignInForm, DealerAppShell, SignOutButton |
| `workbookView` | `features/manage-workbook-view/model/workbookViewSlice.ts` | active vertical, filters, saved views, query, sort, density, column bands, rollup expansion/group, accuracy view | FilterRail, WorkbookToolbar, ColumnChooser, IndentWorkbook, IndentRollup, IndentAccuracyReport, DealerHomePage |

Login field contents, modal/drawer/popover state, filter-rail collapse, theme preference and
toast visibility remain local UI state as required by `dataflow.md`; CSV is also local UI work.

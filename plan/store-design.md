# Store design

## Store shape
| Reducer path | Source | Fields |
|---|---|---|
| `api` | `src/shared/api/baseApi.ts` | RTK Query cache for server data |
| `session` | `entities/session/model/sessionSlice.ts` | user, token, status |
| `workbookView` | `features/manage-workbook-view/model/workbookViewSlice.ts` | vertical, filters, saved views, query, sort, density, bands, rollups, accuracy |

## Endpoints
| Endpoint | Kind | Path | Tags | File |
|---|---|---|---|---|
| getCurrentUser | query | `/users/me` | Session | entities/session/api |
| getDealerCycleSummary | query | `/dealers/{dealerId}/cycles/{cycleId}/summary` | DealerSummary, Cycle | entities/dealer/api |
| listDealerIndentLines | query | `/dealers/{dealerId}/cycles/{cycleId}/indent-lines` | IndentLine LIST + ids | entities/indent-line/api |
| addDealerIndentLine | mutation | `/dealers/{dealerId}/cycles/{cycleId}/indent-lines` | invalidates IndentLine LIST | features/edit-indent/api |
| updateDealerIndentCell | mutation | `/dealers/{dealerId}/cycles/{cycleId}/indent-lines/{lineId}` | invalidates IndentLine id/LIST | features/edit-indent/api |
| batchUpdateDealerIndentCells | mutation | `/dealers/{dealerId}/cycles/{cycleId}/indent-lines/batch` | invalidates IndentLine LIST | features/edit-indent/api |
| getDealerSubmitPreview | query | `/dealers/{dealerId}/cycles/{cycleId}/submit-preview` | SubmitPreview | features/submit-indent/api |
| submitDealerIndent | mutation | `/dealers/{dealerId}/cycles/{cycleId}/submit` | DealerSummary, Cycle, IndentLine LIST, SubmitPreview | features/submit-indent/api |
| loginDealer / loginWithVecvnetSso | mutation | `/auth/login` / `/auth/sso` | invalidates Session | features/authenticate/api |
| requestPasswordReset | mutation | `/auth/password-reset` | none | features/authenticate/api |
| listFertCatalogue | query | `/dealers/{dealerId}/cycles/{cycleId}/fert-catalogue` | FertCatalogue LIST | entities/fert-catalogue/api |
| reopenDealerIndent | mutation | `/dealers/{dealerId}/cycles/{cycleId}/reopen` | DealerSummary, Cycle, IndentLine LIST | features/submit-indent/api |

## Tag strategy
Queries provide stable collection/entity tags. Mutations invalidate only the collections or entities named by the integration plan. All failures are normalized by `baseApi` to `ApiError`.

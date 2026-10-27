# API schema summary

The generated contract defines 13 operations. The base URL is
`https://api.vecvplan.example.com/api/v1`. Authentication is HTTP Bearer (JWT),
sent in the `Authorization` header; all operations inherit the global security
requirement, including the proposed authentication operations.

Pagination is used by `listDealerIndentLines`: the response envelope contains
`items`, `totalElements`, `page`, and `size`. The endpoint map records this as
`items`, `totalElements`, and `page`.

Errors use the `Error` schema (exported as `ApiErrorBody`) with required fields
`errorCode`, `category`, `retryable`, `message`, and `requestId`. Most operations
declare only a `default` error response, so the endpoint map normalizes the
likely HTTP failures to 401 and 500; the explicitly declared 409 responses are
also recorded.

| Operation | Method | Path | Real/mock | Response model |
|---|---|---|---|---|
| getCurrentUser | GET | `/users/me` | real | GetCurrentUserResponse |
| getDealerCycleSummary | GET | `/dealers/{dealerId}/cycles/{cycleId}/summary` | real | GetDealerCycleSummaryResponse |
| listDealerIndentLines | GET | `/dealers/{dealerId}/cycles/{cycleId}/indent-lines` | real | ListDealerIndentLinesResponse |
| addDealerIndentLine | POST | `/dealers/{dealerId}/cycles/{cycleId}/indent-lines` | real | AddDealerIndentLineResponse |
| updateDealerIndentCell | PUT | `/dealers/{dealerId}/cycles/{cycleId}/indent-lines/{lineId}` | real | UpdateDealerIndentCellResponse |
| batchUpdateDealerIndentCells | PUT | `/dealers/{dealerId}/cycles/{cycleId}/indent-lines/batch` | real | BatchUpdateDealerIndentCellsResponse |
| getDealerSubmitPreview | GET | `/dealers/{dealerId}/cycles/{cycleId}/submit-preview` | real | GetDealerSubmitPreviewResponse |
| submitDealerIndent | POST | `/dealers/{dealerId}/cycles/{cycleId}/submit` | real | SubmitDealerIndentResponse |
| loginDealer | POST | `/auth/login` | mock | LoginDealerResponse |
| loginWithVecvnetSso | POST | `/auth/sso` | mock | LoginWithVecvnetSsoResponse |
| requestPasswordReset | POST | `/auth/password-reset` | mock | RequestPasswordResetResponse |
| listFertCatalogue | GET | `/dealers/{dealerId}/cycles/{cycleId}/fert-catalogue` | mock | ListFertCatalogueResponse |
| reopenDealerIndent | POST | `/dealers/{dealerId}/cycles/{cycleId}/reopen` | mock | ReopenDealerIndentResponse |

## Vague or incomplete areas

- `DealerCycleSummary.dealer`, `totals`, and `permissions` are untyped objects and therefore generate as `Record<string, never>`.
- `IndentLine.product` is an untyped object; `periods` is an untyped array (`unknown[]`).
- `IndentBatchResult.saved` and `rejected`, and `SubmitPreview.warnings`, are untyped arrays (`unknown[]`).
- `IndentCycleSummary`, `IndentLine`, `IndentBatchResult`, `IndentCell`, `SubmitPreview`, and `SubmitResult` have no `required` list (their properties are optional in generated types).
- The contract does not provide explicit 401 or 500 response entries; it uses a `default` error response. It does explicitly define 409 for add, update, and submit operations, and 207 for batch updates.
- `x-backend-gaps` is present only on `listDealerIndentLines`; its three notes are preserved in the endpoint map.

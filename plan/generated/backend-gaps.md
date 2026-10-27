# Backend gaps — generated 2026-10-26

The supplied backend spec is partial. Existing operations are marked `x-mock: false`; proposed operations remain MSW-backed until implemented.

## Proposed endpoints (mocked until built)
| Method | Path | operationId | Needed by | Schema |
|---|---|---|---|---|
| POST | `/auth/login` | `loginDealer` | SignInForm primary sign-in | LoginRequest, CurrentUser |
| POST | `/auth/sso` | `loginWithVecvnetSso` | SignInForm VECVNet SSO | SsoLoginRequest, CurrentUser |
| POST | `/auth/password-reset` | `requestPasswordReset` | SignInForm Forgot password | PasswordResetRequest, PasswordResetResult |
| GET | `/dealers/{dealerId}/cycles/{cycleId}/fert-catalogue` | `listFertCatalogue` | AddFertDialog | FertCatalogueItem |
| POST | `/dealers/{dealerId}/cycles/{cycleId}/reopen` | `reopenDealerIndent` | SubmissionFooter Reopen | ReopenRequest, ReopenResult |

## Missing params on real endpoints
| Endpoint | Param | Needed by |
|---|---|---|
| `GET /dealers/{dealerId}/cycles/{cycleId}/indent-lines` | `vertical` | IndentWorkbookPage, WorkbookToolbar |
| same | workbook filters: sub-vertical, demand segment, MPG model, tonnage, fuel, cabin, FERT history, status | FilterRail |
| same | additional sort fields beyond `field,direction` | IndentWorkbook |

## Missing fields on real schemas
| Schema | Field | Needed by |
|---|---|---|
| `ProductReference` | dealer segment / `Your segment` | FertDetailDrawer |

## Open questions
- Which production identity provider/protocol implements VECVNet SSO?
- What password-reset confirmation and error contract should the backend expose?
- What authorization and audit rule governs reopening before cut-off?
- Are Runner, Repeater, and Stranger supplied classifications and what are their definitions?
- What are the source, refresh SLA, and authorization rules for stock, live POs, offtake, retail, and accuracy history?

## Spec quality
- Redocly validation was not run because command execution is unavailable in this workspace.

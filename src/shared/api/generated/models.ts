// src/shared/api/generated/models.ts — aliases over generated schema.d.ts. Do not add fields here.
import type { components, operations } from './schema';

type Json<T> = T extends { content: { 'application/json': infer B } } ? B : never;

// ── identity ──
export type CurrentUser = components['schemas']['CurrentUser'];
export type GetCurrentUserResponse = Json<operations['getCurrentUser']['responses']['200']>;
export type LoginDealerRequest = operations['loginDealer']['requestBody']['content']['application/json'];
export type LoginDealerResponse = Json<operations['loginDealer']['responses']['200']>;
export type LoginWithVecvnetSsoRequest = operations['loginWithVecvnetSso']['requestBody']['content']['application/json'];
export type LoginWithVecvnetSsoResponse = Json<operations['loginWithVecvnetSso']['responses']['200']>;
export type RequestPasswordResetRequest = operations['requestPasswordReset']['requestBody']['content']['application/json'];
export type RequestPasswordResetResponse = Json<operations['requestPasswordReset']['responses']['202']>;

// ── dealer indent ──
export type DealerCycleSummary = components['schemas']['DealerCycleSummary'];
export type GetDealerCycleSummaryPath = NonNullable<operations['getDealerCycleSummary']['parameters']['path']>;
export type GetDealerCycleSummaryResponse = Json<operations['getDealerCycleSummary']['responses']['200']>;
export type IndentLinePage = components['schemas']['IndentLinePage'];
export type IndentLine = components['schemas']['IndentLine'];
export type ListDealerIndentLinesPath = NonNullable<operations['listDealerIndentLines']['parameters']['path']>;
export type ListDealerIndentLinesParams = NonNullable<operations['listDealerIndentLines']['parameters']['query']>;
export type ListDealerIndentLinesResponse = Json<operations['listDealerIndentLines']['responses']['200']>;
export type AddDealerIndentLinePath = NonNullable<operations['addDealerIndentLine']['parameters']['path']>;
export type AddDealerIndentLineRequest = operations['addDealerIndentLine']['requestBody']['content']['application/json'];
export type AddDealerIndentLineResponse = Json<operations['addDealerIndentLine']['responses']['201']>;
export type UpdateDealerIndentCellPath = NonNullable<operations['updateDealerIndentCell']['parameters']['path']>;
export type UpdateDealerIndentCellRequest = operations['updateDealerIndentCell']['requestBody']['content']['application/json'];
export type UpdateDealerIndentCellResponse = Json<operations['updateDealerIndentCell']['responses']['200']>;
export type BatchUpdateDealerIndentCellsPath = NonNullable<operations['batchUpdateDealerIndentCells']['parameters']['path']>;
export type BatchUpdateDealerIndentCellsRequest = operations['batchUpdateDealerIndentCells']['requestBody']['content']['application/json'];
export type BatchUpdateDealerIndentCellsResponse = Json<operations['batchUpdateDealerIndentCells']['responses']['200']>;
export type BatchUpdateDealerIndentCellsPartialResponse = Json<operations['batchUpdateDealerIndentCells']['responses']['207']>;
export type GetDealerSubmitPreviewPath = NonNullable<operations['getDealerSubmitPreview']['parameters']['path']>;
export type GetDealerSubmitPreviewResponse = Json<operations['getDealerSubmitPreview']['responses']['200']>;
export type SubmitDealerIndentPath = NonNullable<operations['submitDealerIndent']['parameters']['path']>;
export type SubmitDealerIndentRequest = operations['submitDealerIndent']['requestBody']['content']['application/json'];
export type SubmitDealerIndentResponse = Json<operations['submitDealerIndent']['responses']['200']>;
export type ListFertCataloguePath = NonNullable<operations['listFertCatalogue']['parameters']['path']>;
export type ListFertCatalogueParams = NonNullable<operations['listFertCatalogue']['parameters']['query']>;
export type ListFertCatalogueResponse = Json<operations['listFertCatalogue']['responses']['200']>;
export type ReopenDealerIndentPath = NonNullable<operations['reopenDealerIndent']['parameters']['path']>;
export type ReopenDealerIndentRequest = operations['reopenDealerIndent']['requestBody']['content']['application/json'];
export type ReopenDealerIndentResponse = Json<operations['reopenDealerIndent']['responses']['200']>;

// ── submission ──
export type SubmitPreview = components['schemas']['SubmitPreview'];
export type SubmitRequest = components['schemas']['SubmitRequest'];
export type SubmitResult = components['schemas']['SubmitResult'];
export type ReopenRequest = components['schemas']['ReopenRequest'];
export type ReopenResult = components['schemas']['ReopenResult'];

// ── errors ──
export type ApiErrorBody = components['schemas']['Error'];

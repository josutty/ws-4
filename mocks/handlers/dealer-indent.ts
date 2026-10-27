import { http, HttpResponse } from 'msw';
import type { AddDealerIndentLineRequest, AddDealerIndentLineResponse, ApiErrorBody, BatchUpdateDealerIndentCellsRequest, BatchUpdateDealerIndentCellsResponse, GetDealerCycleSummaryResponse, ListDealerIndentLinesResponse, ListFertCatalogueResponse, UpdateDealerIndentCellRequest, UpdateDealerIndentCellResponse } from '@shared/api/generated/models';
import type { components } from '@shared/api/generated/schema';
import { db } from '../db';
import { apiUrl } from '../lib';

const error = (message: string): HttpResponse<ApiErrorBody> => HttpResponse.json({ errorCode: 'CONFLICT', category: 'BUSINESS', retryable: true, message, requestId: 'request-2' }, { status: 409 });

export const dealerIndentRealHandlers = [
  http.get<never, never, GetDealerCycleSummaryResponse>(apiUrl('/dealers/:dealerId/cycles/:cycleId/summary'), () => HttpResponse.json(db.summary)),
  http.get<never, never, ListDealerIndentLinesResponse>(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines'), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const items = search ? db.indentLines.filter((line) => JSON.stringify(line.product).toLowerCase().includes(search)) : db.indentLines;
    return HttpResponse.json({ page: Number(url.searchParams.get('page') ?? 0), size: Number(url.searchParams.get('size') ?? 50), totalElements: items.length, items });
  }),
  http.post<never, AddDealerIndentLineRequest, AddDealerIndentLineResponse | ApiErrorBody>(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines'), async ({ request }) => {
    const body = await request.json();
    const existing = db.indentLines.find((line) => JSON.stringify(line.product).includes(body.productMemberId));
    if (existing) return error('This FERT is already in the indent.');
    const line = { lineId: `line-${db.indentLines.length + 1}`, product: {}, stock: 0, periods: [], version: 1 };
    db.indentLines.push(line);
    return HttpResponse.json(line, { status: 201 });
  }),
  http.put<{ lineId: string }, UpdateDealerIndentCellRequest, UpdateDealerIndentCellResponse | ApiErrorBody>(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines/:lineId'), async ({ params, request }) => {
    const line = db.indentLines.find((item) => item.lineId === params.lineId);
    if (!line) return error('Indent line was not found.');
    const body = await request.json();
    line.version = (line.version ?? 0) + 1;
    return HttpResponse.json({ factId: `fact-${params.lineId}`, measure: body.measure, periodId: body.periodId, value: body.value, version: line.version, updatedAt: '2026-07-15T10:00:00Z' } satisfies components['schemas']['IndentCell']);
  }),
  http.put<never, BatchUpdateDealerIndentCellsRequest, BatchUpdateDealerIndentCellsResponse>(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines/batch'), async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ saved: body.cells, rejected: [] });
  }),
];

export const dealerIndentMockHandlers = [
  http.get<never, never, ListFertCatalogueResponse>(apiUrl('/dealers/:dealerId/cycles/:cycleId/fert-catalogue'), ({ request }) => {
    const search = new URL(request.url).searchParams.get('search')?.toLowerCase();
    return HttpResponse.json(search ? db.catalogue.filter((item) => `${item.fertCode} ${item.description}`.toLowerCase().includes(search)) : db.catalogue);
  }),
];

export const dealerIndentHandlers = [...dealerIndentRealHandlers, ...dealerIndentMockHandlers];

import { http, HttpResponse } from 'msw';
import type { ApiErrorBody, GetDealerSubmitPreviewResponse, ReopenDealerIndentRequest, ReopenDealerIndentResponse, SubmitDealerIndentRequest, SubmitDealerIndentResponse } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl } from '../lib';

export const submissionRealHandlers = [
  http.get<never, never, GetDealerSubmitPreviewResponse>(apiUrl('/dealers/:dealerId/cycles/:cycleId/submit-preview'), () => HttpResponse.json(db.preview)),
  http.post<never, SubmitDealerIndentRequest, SubmitDealerIndentResponse | ApiErrorBody>(apiUrl('/dealers/:dealerId/cycles/:cycleId/submit'), async ({ request }) => {
    await request.json();
    db.summary.status = 'SUBMITTED';
    return HttpResponse.json({ taskId: 'task-1', status: 'SUBMITTED', submittedAt: '2026-07-15T10:00:00Z', recipient: 'R. Khanna, ASM North Cluster', reopenUntil: '2026-07-15T18:29:00Z' });
  }),
];

export const submissionMockHandlers = [
  http.post<never, ReopenDealerIndentRequest, ReopenDealerIndentResponse>(apiUrl('/dealers/:dealerId/cycles/:cycleId/reopen'), async ({ request }) => {
    await request.json();
    db.summary.status = 'NOT_SUBMITTED';
    return HttpResponse.json({ status: 'REOPENED', reopenUntil: '2026-07-15T18:29:00Z' });
  }),
];

export const submissionHandlers = [...submissionRealHandlers, ...submissionMockHandlers];

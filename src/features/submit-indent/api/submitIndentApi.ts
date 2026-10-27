import { baseApi, type GetDealerSubmitPreviewPath, type GetDealerSubmitPreviewResponse, type SubmitDealerIndentPath, type SubmitDealerIndentRequest, type SubmitDealerIndentResponse, type ReopenDealerIndentPath, type ReopenDealerIndentRequest, type ReopenDealerIndentResponse } from '@shared/api';

const idempotencyKey = () => crypto.randomUUID();
type SubmitArgs = { path: SubmitDealerIndentPath; body: SubmitDealerIndentRequest };
type ReopenArgs = { path: ReopenDealerIndentPath; body: ReopenDealerIndentRequest };

export const submitIndentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDealerSubmitPreview: build.query<GetDealerSubmitPreviewResponse, GetDealerSubmitPreviewPath>({
      query: ({ dealerId, cycleId }) => `/dealers/${dealerId}/cycles/${cycleId}/submit-preview`,
      providesTags: ['SubmitPreview'],
    }),
    submitDealerIndent: build.mutation<SubmitDealerIndentResponse, SubmitArgs>({
      query: ({ path, body }) => ({ url: `/dealers/${path.dealerId}/cycles/${path.cycleId}/submit`, method: 'POST', body, headers: { 'Idempotency-Key': idempotencyKey() } }),
      invalidatesTags: ['DealerSummary', 'Cycle', { type: 'IndentLine', id: 'LIST' }, 'SubmitPreview'],
    }),
    reopenDealerIndent: build.mutation<ReopenDealerIndentResponse, ReopenArgs>({
      query: ({ path, body }) => ({ url: `/dealers/${path.dealerId}/cycles/${path.cycleId}/reopen`, method: 'POST', body, headers: { 'Idempotency-Key': idempotencyKey() } }),
      invalidatesTags: ['DealerSummary', 'Cycle', { type: 'IndentLine', id: 'LIST' }],
    }),
  }),
});

export const { useGetDealerSubmitPreviewQuery, useSubmitDealerIndentMutation, useReopenDealerIndentMutation } = submitIndentApi;

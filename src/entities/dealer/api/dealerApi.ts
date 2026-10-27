import { baseApi, type GetDealerCycleSummaryPath, type GetDealerCycleSummaryResponse } from '@shared/api';

export const dealerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDealerCycleSummary: build.query<GetDealerCycleSummaryResponse, GetDealerCycleSummaryPath>({
      query: ({ dealerId, cycleId }) => `/dealers/${dealerId}/cycles/${cycleId}/summary`,
      providesTags: ['DealerSummary', 'Cycle'],
    }),
  }),
});

export const { useGetDealerCycleSummaryQuery } = dealerApi;

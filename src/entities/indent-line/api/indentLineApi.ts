import { baseApi, type ListDealerIndentLinesParams, type ListDealerIndentLinesResponse, type ListDealerIndentLinesPath } from '@shared/api';

type ListArgs = { path: ListDealerIndentLinesPath; query?: ListDealerIndentLinesParams };

export const indentLineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listDealerIndentLines: build.query<ListDealerIndentLinesResponse, ListArgs>({
      query: ({ path, query }) => ({ url: `/dealers/${path.dealerId}/cycles/${path.cycleId}/indent-lines`, params: query }),
      providesTags: (result) => [
        { type: 'IndentLine', id: 'LIST' },
        ...(result?.items.map(({ lineId }) => ({ type: 'IndentLine' as const, id: lineId })) ?? []),
      ],
    }),
  }),
});

export const { useListDealerIndentLinesQuery } = indentLineApi;

import { baseApi, type ListFertCatalogueParams, type ListFertCataloguePath, type ListFertCatalogueResponse } from '@shared/api';

type ListArgs = { path: ListFertCataloguePath; query: ListFertCatalogueParams };

export const fertCatalogueApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listFertCatalogue: build.query<ListFertCatalogueResponse, ListArgs>({
      query: ({ path, query }) => ({ url: `/dealers/${path.dealerId}/cycles/${path.cycleId}/fert-catalogue`, params: query }),
      providesTags: [{ type: 'FertCatalogue', id: 'LIST' }],
    }),
  }),
});

export const { useListFertCatalogueQuery } = fertCatalogueApi;

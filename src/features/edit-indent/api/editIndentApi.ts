import { baseApi, type AddDealerIndentLinePath, type AddDealerIndentLineRequest, type AddDealerIndentLineResponse, type UpdateDealerIndentCellPath, type UpdateDealerIndentCellRequest, type UpdateDealerIndentCellResponse, type BatchUpdateDealerIndentCellsPath, type BatchUpdateDealerIndentCellsRequest, type BatchUpdateDealerIndentCellsResponse } from '@shared/api';

const idempotencyKey = () => crypto.randomUUID();
type AddArgs = { path: AddDealerIndentLinePath; body: AddDealerIndentLineRequest };
type UpdateArgs = { path: UpdateDealerIndentCellPath; body: UpdateDealerIndentCellRequest };
type BatchArgs = { path: BatchUpdateDealerIndentCellsPath; body: BatchUpdateDealerIndentCellsRequest };

export const editIndentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDealerIndentLine: build.mutation<AddDealerIndentLineResponse, AddArgs>({
      query: ({ path, body }) => ({ url: `/dealers/${path.dealerId}/cycles/${path.cycleId}/indent-lines`, method: 'POST', body, headers: { 'Idempotency-Key': idempotencyKey() } }),
      invalidatesTags: [{ type: 'IndentLine', id: 'LIST' }],
    }),
    updateDealerIndentCell: build.mutation<UpdateDealerIndentCellResponse, UpdateArgs>({
      query: ({ path, body }) => ({ url: `/dealers/${path.dealerId}/cycles/${path.cycleId}/indent-lines/${path.lineId}`, method: 'PUT', body }),
      invalidatesTags: (_r, _e, { path }) => [{ type: 'IndentLine', id: path.lineId }, { type: 'IndentLine', id: 'LIST' }],
    }),
    batchUpdateDealerIndentCells: build.mutation<BatchUpdateDealerIndentCellsResponse, BatchArgs>({
      query: ({ path, body }) => ({ url: `/dealers/${path.dealerId}/cycles/${path.cycleId}/indent-lines/batch`, method: 'PUT', body }),
      invalidatesTags: [{ type: 'IndentLine', id: 'LIST' }],
    }),
  }),
});

export const { useAddDealerIndentLineMutation, useUpdateDealerIndentCellMutation, useBatchUpdateDealerIndentCellsMutation } = editIndentApi;

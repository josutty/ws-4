import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { env } from '@shared/config';
import { toApiError, type ApiError } from './errors';
import { sessionExpired } from './events';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  timeout: 15_000,
  fetchFn: async (input) => {
  if (typeof input === 'string') {
    return fetch(input);
  }

  const request = input as Request;
  const method = request.method.toUpperCase();
  const body =
    method === 'GET' || method === 'HEAD'
      ? undefined
      : await request.clone().text();

  return fetch(request.url, {
    method: request.method,
    headers: request.headers,
    body,
  });
},
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { session?: { token?: string | null } }).session?.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, ApiError> = async (
  args,
  api,
  extra,
) => {

  const result = await rawBaseQuery(args, api, extra);

  if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(sessionExpired());
    }

    return {
      error: toApiError(result.error),
      meta: result.meta,
    };
  }

  return {
    data: result.data,
    meta: result.meta,
  };
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'Session',
    'DealerSummary',
    'Cycle',
    'IndentLine',
    'SubmitPreview',
    'FertCatalogue',
  ],
  endpoints: () => ({}),
});
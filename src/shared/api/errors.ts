import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export interface ApiError {
  status: number | 'NETWORK' | 'TIMEOUT' | 'PARSE' | 'UNKNOWN';
  code: string;
  message: string;
}

const isBody = (d: unknown): d is { code?: string; message?: string } =>
  typeof d === 'object' && d !== null;

export const toApiError = (e: FetchBaseQueryError): ApiError => {
  if (typeof e.status === 'number') {
    const body = isBody(e.data) ? e.data : {};
    return { status: e.status, code: body.code ?? `HTTP_${e.status}`, message: body.message ?? 'Request failed' };
  }
  if (e.status === 'FETCH_ERROR') return { status: 'NETWORK', code: 'NETWORK', message: 'Network error — check your connection' };
  if (e.status === 'TIMEOUT_ERROR') return { status: 'TIMEOUT', code: 'TIMEOUT', message: 'The request timed out' };
  if (e.status === 'PARSING_ERROR') return { status: 'PARSE', code: 'PARSE', message: 'Unexpected server response' };
  return { status: 'UNKNOWN', code: 'UNKNOWN', message: e.error };
};

export const getErrorMessage = (error: ApiError | SerializedError | undefined): string =>
  error?.message ?? 'Something went wrong';

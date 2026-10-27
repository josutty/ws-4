import { baseApi, type LoginDealerRequest, type LoginDealerResponse, type LoginWithVecvnetSsoRequest, type LoginWithVecvnetSsoResponse, type RequestPasswordResetRequest, type RequestPasswordResetResponse } from '@shared/api';

export const authenticateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginDealer: build.mutation<LoginDealerResponse, LoginDealerRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['Session'],
    }),
    loginWithVecvnetSso: build.mutation<LoginWithVecvnetSsoResponse, LoginWithVecvnetSsoRequest>({
      query: (body) => ({ url: '/auth/sso', method: 'POST', body }),
      invalidatesTags: ['Session'],
    }),
    requestPasswordReset: build.mutation<RequestPasswordResetResponse, RequestPasswordResetRequest>({
      query: (body) => ({ url: '/auth/password-reset', method: 'POST', body }),
    }),
  }),
});

export const { useLoginDealerMutation, useLoginWithVecvnetSsoMutation, useRequestPasswordResetMutation } = authenticateApi;

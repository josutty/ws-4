import { http, HttpResponse } from 'msw';
import type { ApiErrorBody, LoginDealerRequest, LoginDealerResponse, LoginWithVecvnetSsoRequest, LoginWithVecvnetSsoResponse, RequestPasswordResetRequest, RequestPasswordResetResponse } from '@shared/api/generated/models';
import { db } from '../db';
import { apiUrl } from '../lib';

const error = (message: string, errorCode = 'AUTH_FAILED'): HttpResponse<ApiErrorBody> => HttpResponse.json({ errorCode, category: 'AUTHENTICATION', retryable: false, message, requestId: 'request-1' }, { status: 401 });

export const identityRealHandlers = [
  http.get(apiUrl('/users/me'), () => HttpResponse.json(db.users[0])),
];

export const identityMockHandlers = [
  http.post<never, LoginDealerRequest, LoginDealerResponse | ApiErrorBody>(apiUrl('/auth/login'), async ({ request }) => {
    const body = await request.json();
    return body.dealerCodeOrEmail === 'DLR-1002' && body.password === 'REDACTED' ? HttpResponse.json(db.users[0]) : error(body.dealerCodeOrEmail === 'unknown@example.com' ? "We don't recognise that dealer code." : 'Incorrect password. 4 attempts left before the account locks.');
  }),
  http.post<never, LoginWithVecvnetSsoRequest, LoginWithVecvnetSsoResponse | ApiErrorBody>(apiUrl('/auth/sso'), () => HttpResponse.json(db.users[0])),
  http.post<never, RequestPasswordResetRequest, RequestPasswordResetResponse>(apiUrl('/auth/password-reset'), () => HttpResponse.json({ accepted: true }, { status: 202 })),
];

export const identityHandlers = [...identityRealHandlers, ...identityMockHandlers];

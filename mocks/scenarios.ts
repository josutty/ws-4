import { delay, http, HttpResponse } from 'msw';
import { apiUrl } from './lib';

const failure = (message: string, status = 500) => HttpResponse.json({ errorCode: 'INTERNAL', category: 'SYSTEM', retryable: true, message, requestId: 'scenario-1' }, { status });

export const scenarios = {
  loginInvalidDealerCode: [http.post(apiUrl('/auth/login'), () => HttpResponse.json({ errorCode: 'AUTH_FAILED', category: 'AUTHENTICATION', retryable: false, message: "We don't recognise that dealer code.", requestId: 'scenario-auth' }, { status: 401 }))],
  loginInvalidPassword: [http.post(apiUrl('/auth/login'), () => HttpResponse.json({ errorCode: 'AUTH_FAILED', category: 'AUTHENTICATION', retryable: false, message: 'Incorrect password. 4 attempts left before the account locks.', requestId: 'scenario-auth' }, { status: 401 }))],
  authServerError: [http.post(apiUrl('/auth/login'), () => failure('Authentication is temporarily unavailable.'))],
  authNetworkError: [http.post(apiUrl('/auth/login'), () => HttpResponse.error())],
  ssoServerError: [http.post(apiUrl('/auth/sso'), () => failure('SSO is temporarily unavailable.'))],
  passwordResetServerError: [http.post(apiUrl('/auth/password-reset'), () => failure('Password reset could not be requested.'))],
  currentUserServerError: [http.get(apiUrl('/users/me'), () => failure('Your dealer account could not be loaded.'))],
  dashboardServerError: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/summary'), () => failure('Dashboard could not be loaded.'))],
  dashboardEmpty: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/summary'), () => HttpResponse.json({ cycleId: '', cycleLabel: '', status: 'EMPTY', lines: 0 }))],
  slowDashboard: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/summary'), async () => { await delay('infinite'); return HttpResponse.json({ cycleId: '', cycleLabel: '', status: 'LOADING', lines: 0 }); })],
  workbookServerError: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines'), () => failure('Workbook could not be loaded.'))],
  workbookEmpty: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines'), () => HttpResponse.json({ page: 0, size: 50, totalElements: 0, items: [] }))],
  workbookNetworkError: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines'), () => HttpResponse.error())],
  submissionConflict: [http.post(apiUrl('/dealers/:dealerId/cycles/:cycleId/submit'), () => failure('The indent cannot be submitted in its current state.', 409))],
  submissionServerError: [http.post(apiUrl('/dealers/:dealerId/cycles/:cycleId/submit'), () => failure('Submission failed.'))],
  submitPreviewServerError: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/submit-preview'), () => failure('Submission preview could not be loaded.'))],
  addIndentLineConflict: [http.post(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines'), () => failure('This FERT is already in the indent.', 409))],
  updateCellConflict: [http.put(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines/:lineId'), () => failure('This cell was changed by another user.', 409))],
  batchUpdateServerError: [http.put(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines/batch'), () => failure('Some workbook cells could not be saved.'))],
  catalogueServerError: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/fert-catalogue'), () => failure('FERT catalogue could not be loaded.'))],
  catalogueEmpty: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/fert-catalogue'), () => HttpResponse.json([]))],
  reopenServerError: [http.post(apiUrl('/dealers/:dealerId/cycles/:cycleId/reopen'), () => failure('The indent could not be reopened.'))],
  slowWorkbook: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines'), async () => { await delay('infinite'); return HttpResponse.json({ page: 0, size: 50, totalElements: 0, items: [] }); })],
  noVehicleHistory: [http.get(apiUrl('/dealers/:dealerId/cycles/:cycleId/indent-lines'), () => HttpResponse.json({ page: 0, size: 50, totalElements: 0, items: [] }))],
};

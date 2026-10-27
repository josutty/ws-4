import { dealerIndentHandlers, dealerIndentMockHandlers, dealerIndentRealHandlers } from './dealer-indent';
import { identityHandlers, identityMockHandlers, identityRealHandlers } from './identity';
import { submissionHandlers, submissionMockHandlers, submissionRealHandlers } from './submission';

export const allHandlers = [...identityHandlers, ...dealerIndentHandlers, ...submissionHandlers];
export const mockOnlyHandlers = [...identityMockHandlers, ...dealerIndentMockHandlers, ...submissionMockHandlers];
export const realHandlers = [...identityRealHandlers, ...dealerIndentRealHandlers, ...submissionRealHandlers];

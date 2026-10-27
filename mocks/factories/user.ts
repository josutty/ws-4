import { faker } from '@faker-js/faker';
import type { CurrentUser } from '@shared/api/generated/models';

export const buildUser = (overrides: Partial<CurrentUser> = {}): CurrentUser => ({
  userId: faker.string.uuid(),
  displayName: 'R. Khanna',
  dealerMemberId: 'dealer-member-1',
  dealerCode: 'DLR-1002',
  dealerName: 'Sharma Motors',
  roles: ['Dealer'],
  ...overrides,
});

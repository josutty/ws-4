import { faker } from '@faker-js/faker';
import type { IndentLine } from '@shared/api/generated/models';

export const buildIndentLine = (overrides: Partial<IndentLine> = {}): IndentLine => ({
  lineId: faker.string.uuid(),
  product: {},
  stock: 0,
  periods: [],
  version: 1,
  ...overrides,
});

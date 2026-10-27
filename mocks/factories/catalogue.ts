import { faker } from '@faker-js/faker';
import type { components } from '@shared/api/generated/schema';

type CatalogueItem = components['schemas']['FertCatalogueItem'];

export const buildCatalogueItem = (overrides: Partial<CatalogueItem> = {}): CatalogueItem => ({
  productMemberId: faker.string.uuid(),
  fertCode: 'V4141LPG',
  description: 'Pro 4140 LPG Flatbed 16FT BSVI',
  vertical: 'LMD',
  added: false,
  ...overrides,
});

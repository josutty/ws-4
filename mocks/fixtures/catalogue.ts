import { faker } from '@faker-js/faker';
import { buildCatalogueItem } from '../factories/catalogue';

faker.seed(1003);
export const catalogueFixtures = [
  buildCatalogueItem({ productMemberId: 'catalogue-1', fertCode: 'V4141LPG' }),
  buildCatalogueItem({ productMemberId: 'catalogue-2', fertCode: 'V4150CNG', description: 'Pro 2050 CNG 14FT BSVI', vertical: 'HD' }),
];

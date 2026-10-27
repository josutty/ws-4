import { faker } from '@faker-js/faker';
import { buildUser } from '../factories/user';

faker.seed(1001);
export const userFixtures = [buildUser({ userId: 'user-1' })];

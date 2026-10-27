import { faker } from '@faker-js/faker';
import { buildIndentLine } from '../factories/indent-line';

faker.seed(1002);
export const indentLineFixtures = [
  buildIndentLine({ lineId: '1', stock: 12, periods: [{ periodId: 'W1', value: 8 }, { periodId: 'W2', value: 7 }, { periodId: 'W3', value: 6 }, { periodId: 'W4', value: 5 }, { periodId: 'Jul', value: 26 }] }),
  buildIndentLine({ lineId: '2', stock: 4, periods: [{ periodId: 'W1', value: 3 }, { periodId: 'Jul', value: 10 }] }),
  buildIndentLine({ lineId: '3', stock: 9, periods: [{ periodId: 'W1', value: 5 }, { periodId: 'Jul', value: 18 }] }),
];

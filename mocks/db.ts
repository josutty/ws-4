import { catalogueFixtures } from './fixtures/catalogue';
import { indentLineFixtures } from './fixtures/indent-line';
import { userFixtures } from './fixtures/user';

const clone = <T>(value: T): T => structuredClone(value);

export const db = {
  users: clone(userFixtures),
  indentLines: clone(indentLineFixtures),
  catalogue: clone(catalogueFixtures),
  summary: { cycleId: 'S&OP-1A', cycleLabel: 'Jul 2026', status: 'NOT_SUBMITTED', closesAt: '2026-07-15T18:29:00Z', lines: 52, totals: {}, permissions: {} },
  preview: { status: 'READY', lines: 52, totals: {}, warnings: ['Some lines have no entered quantities and will submit as zero.'], recipient: 'R. Khanna, ASM North Cluster', reopenUntil: '2026-07-15T18:29:00Z' },
};

export const resetDb = (): void => {
  db.users = clone(userFixtures);
  db.indentLines = clone(indentLineFixtures);
  db.catalogue = clone(catalogueFixtures);
  db.summary = { cycleId: 'S&OP-1A', cycleLabel: 'Jul 2026', status: 'NOT_SUBMITTED', closesAt: '2026-07-15T18:29:00Z', lines: 52, totals: {}, permissions: {} };
  db.preview = { status: 'READY', lines: 52, totals: {}, warnings: ['Some lines have no entered quantities and will submit as zero.'], recipient: 'R. Khanna, ASM North Cluster', reopenUntil: '2026-07-15T18:29:00Z' };
};

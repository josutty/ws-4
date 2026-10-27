import { env } from '@shared/config';

export const apiUrl = (path: string): string => `${env.apiBaseUrl}${path}`;
export const REFERENCE_DATE = new Date('2026-07-15T18:29:00Z');

export const at = <T>(items: readonly T[], index: number): T => {
  const item = items[index];
  if (item === undefined) throw new Error(`fixture index ${index} out of range (${items.length} items)`);
  return item;
};

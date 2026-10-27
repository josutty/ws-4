export const EMPTY_CELL_VALUE = '–';

export function displayCellValue(value: unknown): unknown {
  return value === null || value === undefined || value === ''
    ? EMPTY_CELL_VALUE
    : value;
}

export function isStickyColumn(
  columnId: string,
  frozenColumnId: string | undefined,
  sticky: 'left' | 'right' | undefined,
): boolean {
  return columnId === frozenColumnId || sticky === 'left';
}

export type CsvValue = string | number | boolean | null | undefined;

export type CsvInput = {
  headers: CsvValue[];
  rows: CsvValue[][];
};

const escapeCsvValue = (value: CsvValue): string => {
  const text = value == null ? '' : String(value);
  const escaped = text.replaceAll('"', '""');

  return /[",\n\r]/u.test(text) ? `"${escaped}"` : escaped;
};

export const exportCsv = ({ headers, rows }: CsvInput): string =>
  [headers, ...rows].map((row) => row.map(escapeCsvValue).join(',')).join('\n');

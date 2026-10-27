import type { SelectHTMLAttributes } from 'react';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: readonly SelectOption[];
  error?: string;
};

export function Select({
  label,
  options,
  error,
  id,
  className = '',
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const errorId = `${selectId}-error`;

  return (
    <div className="grid gap-1.5">
      <label htmlFor={selectId} className="font-medium text-fg">
        {label}
      </label>
      <select
        id={selectId}
        className={`min-h-10 rounded-control border bg-surface px-3 py-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-danger' : 'border-border'} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {children}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

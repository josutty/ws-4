import { ToggleGroup } from 'radix-ui';

export type Density = 'comfortable' | 'compact';

export type DensityToggleProps = {
  value?: Density;
  defaultValue?: Density;
  onValueChange?: (value: Density) => void;
  disabled?: boolean;
  className?: string;
};

export function DensityToggle({
  value,
  defaultValue = 'comfortable',
  onValueChange,
  disabled = false,
  className = '',
}: DensityToggleProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      onValueChange={(nextValue) => {
        if (nextValue === 'comfortable' || nextValue === 'compact') {
          onValueChange?.(nextValue);
        }
      }}
      aria-label="Density"
      className={`inline-flex rounded-control border border-border bg-surface p-1 ${className}`}
      disabled={disabled}
    >
      <ToggleGroup.Item
        value="comfortable"
        className="min-h-10 rounded-control px-3 py-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus data-[state=on]:bg-primary-soft"
      >
        Comfortable
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="compact"
        className="min-h-10 rounded-control px-3 py-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus data-[state=on]:bg-primary-soft"
      >
        Compact
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

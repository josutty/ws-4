import type { ButtonHTMLAttributes } from 'react';

const variantClasses = {
  primary:
    'bg-primary text-primary-fg hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-focus',
  secondary:
    'border border-border bg-surface text-fg hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-focus',
  danger:
    'bg-danger text-danger-fg hover:bg-danger focus-visible:ring-2 focus-visible:ring-focus',
  ghost:
    'bg-transparent text-fg hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-focus',
} as const;

export type ButtonVariant = keyof typeof variantClasses;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`min-h-10 rounded-control px-4 py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: token('surface'), muted: token('surface-muted') },
        canvas: token('canvas'),
        fg: { DEFAULT: token('fg'), muted: token('fg-muted') },
        muted: token('muted'),
        border: { DEFAULT: token('border'), strong: token('border-strong') },
        'border-muted': token('border-muted'),
        primary: { DEFAULT: token('primary'), hover: token('primary-hover'), fg: token('primary-fg'), soft: token('primary-soft') },
        danger: { DEFAULT: token('danger'), fg: token('danger-fg'), soft: token('danger-soft') },
        success: { DEFAULT: token('success'), fg: token('success-fg'), soft: token('success-soft') },
        warning: { DEFAULT: token('warning'), fg: token('warning-fg'), soft: token('warning-soft') },
        'warning-strong': token('warning-strong'),
        add: { DEFAULT: token('add'), soft: token('add-soft') },
        accent: token('accent'),
        brand: token('brand'),
        'inverse-subtle': token('inverse-subtle'),
        'top-bar-warning': token('top-bar-warning'),
        'top-bar-role': token('top-bar-role'),
        inverse: { DEFAULT: token('inverse'), muted: token('inverse-muted') },
        focus: token('focus'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'heading-1': ['1.5rem', { lineHeight: '1.45', fontWeight: '600', letterSpacing: '-0.025em' }],
        'heading-2': ['1.1875rem', { lineHeight: '1.45', fontWeight: '600' }],
        'heading-3': ['1rem', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['0.84375rem', { lineHeight: '1.45' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.45' }],
        caption: ['0.6875rem', { lineHeight: '1.45' }],
        label: ['0.8125rem', { lineHeight: '1.45' }],
        overline: ['0.6875rem', { lineHeight: '1.45', letterSpacing: '0.08em', fontWeight: '700' }],
        micro: ['0.6875rem', { lineHeight: '1.3' }],
        'numeric-display': ['1.6875rem', { lineHeight: '1', fontWeight: '600' }],
      },
      borderRadius: { control: 'var(--radius-control)', card: 'var(--radius-card)', pill: 'var(--radius-pill)' },
      backgroundImage: { page: 'var(--gradient-page)', login: 'var(--gradient-login)' },
      boxShadow: { card: 'var(--shadow-card)', overlay: 'var(--shadow-overlay)' },
    },
  },
  plugins: [],
} satisfies Config;

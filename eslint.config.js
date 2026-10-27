import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier/flat'; // turns off rules that fight Prettier — keep it after the other configs

export default tseslint.config(
  {
    ignores: [
      'dist',
      'storybook-static',
      'coverage',
      'public',
      'playwright-report',
      'test-results',
      'src/shared/api/generated',
      'tools', // team-shipped helper scripts (humans own them; not linted)
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'error',
    },
  },
  {
    files: ['src/**/*.tsx'],
    ignores: ['src/**/*.test.tsx', 'src/**/*.stories.tsx'],
    rules: {
      'max-lines': ['error', { max: 250 }],
      'no-restricted-globals': ['error', { name: 'fetch', message: 'Use RTK Query hooks (AGENTS.md §3)' }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'axios', message: 'Use RTK Query' },
            { name: '@shared/api/baseApi', message: 'Components use entity/feature hooks, not baseApi' },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        { selector: "JSXAttribute[name.name='style']", message: 'Tailwind classes only (AGENTS.md §4)' },
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message: 'XSS risk: render text, or sanitize in shared/lib with a reviewed library',
        },
        // hex colors (#fff, #ffffff, bg-[#ff0000]) — not in-page anchors like "#add-to-cart"
        {
          selector:
            "Literal[value=/(^|[\\s\\[(:,])#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![\\w-])/]",
          message: 'Use semantic color tokens',
        },
        {
          selector:
            "TemplateElement[value.raw=/(^|[\\s\\[(:,])#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![\\w-])/]",
          message: 'Use semantic color tokens',
        },
      ],
    },
  },
  prettierConfig,
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  { files: ['src/shared/lib/logger/**'], rules: { 'no-console': 'off' } },
);

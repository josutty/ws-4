// src/shared/config/routes.ts — route path constants (page TASKs add their own rows)
export const routes = {
  home: '/',
  signIn: '/login',
  dealerHome: '/dealer/home',
  indentWorkbook: '/dealer/indent-workbook',
  notFound: '*',
} as const;

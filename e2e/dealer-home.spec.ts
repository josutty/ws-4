import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

const route = '/dealer/home';

async function expectNoSeriousViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
}

test.describe('/dealer/home', () => {
  test('renders in light mode, is accessible, has no mobile overflow, and has no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: 'Good afternoon, Sharma Motors' })).toBeVisible();
    await expectNoSeriousViolations(page);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });

  test('keeps dark mode accessible', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(route);
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expectNoSeriousViolations(page);
  });
});

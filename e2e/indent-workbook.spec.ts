import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('/dealer/indent-workbook', () => {
  test('renders, supports editing, has no serious a11y violations, and does not overflow on mobile', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto('/dealer/indent-workbook');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('table', { name: /indent workbook/i })).toBeVisible();

    const cell = page.getByRole('textbox', { name: /LMD.*FERT/i }).first();
    await cell.fill('12');
    await cell.press('Enter');
    await expect(cell).toHaveValue('12');

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });

  test('dark mode remains a11y clean', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/dealer/indent-workbook');
    await expect(page.locator('html')).toHaveClass(/dark/);

    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
  });

  test('keeps the frozen first column in place while scrolling the grid', async ({ page }) => {
    await page.goto('/dealer/indent-workbook');
    const firstColumn = page.getByRole('rowheader').first();
    const before = await firstColumn.boundingBox();
    const grid = page.getByRole('table', { name: /indent workbook/i });

    await grid.evaluate((element) => { element.scrollLeft = 500; });
    const after = await firstColumn.boundingBox();
    expect(after?.x).toBe(before?.x);
  });
});

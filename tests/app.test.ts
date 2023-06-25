import {expect, test} from '@playwright/test';

test('has title', async ({page}) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();

  await page.getByText(/count is/).click();
  await expect(page).toHaveScreenshot();

  await page.goto('/');
  await expect(page).toHaveScreenshot();
  // await page.screenshot({path: 'screenshot.png', fullPage: true});
});

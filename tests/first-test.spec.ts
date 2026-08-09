// Import `test` and `expect` from our own fixtures file (not '@playwright/test'
// directly) so tests get access to the custom Page Object fixtures.
import { test, expect } from '../fixtures/test-options';

// Test 01 - Navigate to the Dyson manufacturer page and assert the URL is correct.
test('navigate to the Dyson homepage', async ({ page }) => {
 await page.goto('https://source.thenbs.com/en/gb');
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Dyson');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await page.getByRole('tab', { name: 'Manufacturers' }).click();
  await page.getByRole('link', { name: 'Dyson Dyson Technology for' }).click();
  await expect(page).toHaveURL('https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
});

// Test 02 - Navigate to the Dyson manufacturer page and assert the h1 heading is correct.
test('assert the h1 heading is correct', async ({ page }) => {
 await page.goto('https://source.thenbs.com/en/gb');
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Dyson');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await page.getByRole('tab', { name: 'Manufacturers' }).click();
  await page.getByRole('link', { name: 'Dyson Dyson Technology for' }).click();
  await expect(page.locator('h1')).toContainText('Dyson');
  await expect(page.getByText('Technology for business', { exact: true })).toBeVisible();
});

// Test 03 - Navigate to the Dyson manufacturer page and assert the telephone number is correct.
test('assert the telephone number is correct', async ({ page }) => {
 await page.goto('https://source.thenbs.com/en/gb');
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Dyson');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await page.getByRole('tab', { name: 'Manufacturers' }).click();
  await page.getByRole('link', { name: 'Dyson Dyson Technology for' }).click();
  await expect(page.getByRole('link', { name: '08003457788' })).toBeVisible();
  await expect(page.getByRole('link', { name: '08003457788' })).toContainText('08003457788');
  await expect(page.getByRole('link', { name: '08003457788' })).toHaveAttribute('href', 'tel:08003457788');
});

// Test 04 - Navigate to the Dyson manufacturer page and assert the website link is correct.
test('assert the website link is correct', async ({ page }) => {
 await page.goto('https://source.thenbs.com/en/gb');
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('Dyson');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await page.getByRole('tab', { name: 'Manufacturers' }).click();
  await page.getByRole('link', { name: 'Dyson Dyson Technology for' }).click();
  await expect(page.getByRole('link', { name: 'Website' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Website' })).toContainText('Website');
  await expect(page.getByRole('link', { name: 'Website' })).toHaveAttribute('href', 'https://www.dyson.co.uk/commercial/overview');
  await expect(page.getByRole('link', { name: 'Website' })).toHaveAttribute('target', '_blank');
});


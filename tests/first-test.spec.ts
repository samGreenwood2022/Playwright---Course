// Import `test` and `expect` from our own fixtures file (not '@playwright/test'
// directly) so tests get access to the custom Page Object fixtures.
import { test, expect } from '../fixtures/test-options';

test.beforeEach(async ({ page }) => {
  // Navigate to the Dyson Manufacturer homepage before each test.
  const searchInput = page.getByRole('textbox', { name: 'Search' });
  const manufacturerTab = page.getByRole('tab', { name: 'Manufacturers' });
  const dysonLink = page.getByRole('link', { name: 'Dyson Dyson Technology for' });

  await page.goto('https://source.thenbs.com/en/gb');
  await searchInput.click();
  await searchInput.fill('Dyson');
  await searchInput.press('Enter');
  await manufacturerTab.click();
  await dysonLink.click();
  await expect(page).toHaveURL('https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
});

// Test 01 - Navigate to the Dyson manufacturer page and assert the h1 heading is correct.
test('assert the h1 heading is correct', async ({ page }) => {
  const h1Heading = page.locator('h1');
  const h1HeadingText = page.getByText('Technology for business', { exact: true });

  await expect(h1Heading).toBeVisible();
  await expect(h1Heading).toContainText('Dyson');
  await expect(h1HeadingText).toHaveText('Technology for business');
  await expect(h1HeadingText).toBeVisible();
});

// Test 02 - Navigate to the Dyson manufacturer page and assert the telephone number is correct.
test('assert the telephone number is correct', async ({ page }) => {
  const telephoneNumber = page.getByRole('link', { name: '08003457788' });

  await expect(telephoneNumber).toBeVisible();
  await expect(telephoneNumber).toContainText('08003457788');
  await expect(telephoneNumber).toHaveAttribute('href', 'tel:08003457788');
});

// Test 03 - Navigate to the Dyson manufacturer page and assert the website link is correct.
test('assert the website link is correct', async ({ page }) => {
  const websiteLink = page.getByRole('link', { name: 'Website' });

  await expect(websiteLink).toBeVisible();
  await expect(websiteLink).toContainText('Website');
  await expect(websiteLink).toHaveAttribute('href', 'https://www.dyson.co.uk/commercial/overview');
  await expect(websiteLink).toHaveAttribute('target', '_blank');
});


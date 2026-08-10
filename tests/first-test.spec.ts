// Import `test` and `expect` from our own fixtures file (not '@playwright/test'
// directly) so tests get access to the custom Page Object fixtures.
import { test, expect } from '../fixtures/test-options';

// The manufacturer page we expect to land on after clicking the Dyson search result.
const DYSON_MANUFACTURER_URL =
  'https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview';

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

  // Clicking the link kicks off a navigation. `waitForURL` blocks until the browser
  // has actually landed on that URL *and* reached the 'load' event (its default
  // waitUntil), so the tests below don't start querying a half-rendered page.
  await page.waitForURL(DYSON_MANUFACTURER_URL);

  // Web-first assertion: confirms we're on the right page and gives a clear
  // failure message if the navigation went somewhere unexpected.
  await expect(page).toHaveURL(DYSON_MANUFACTURER_URL);
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


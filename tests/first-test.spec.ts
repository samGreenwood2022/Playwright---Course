// Import `test` and `expect` from our own fixtures file (not '@playwright/test'
// directly) so tests get access to the custom Page Object fixtures.
import { test, expect } from '../fixtures/test-options';
import { NbsHomepage } from '../pages/nbs-homepage';
import { SearchResultsPage } from '../pages/search-results-page';
import { DysonManufacturerPage } from '../pages/dyson-manufacturer-page';



test.beforeEach(async ({ page }) => {
  // Navigate to the Dyson Manufacturer homepage before each test.
  const nbsHomepage = new NbsHomepage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const dysonManufacturerPage = new DysonManufacturerPage(page);
  const url = dysonManufacturerPage.url;

  await nbsHomepage.navigateToNbsHomepage();
  await nbsHomepage.searchInput.click();
  await nbsHomepage.searchInput.fill('Dyson');
  await nbsHomepage.searchInput.press('Enter');
  await searchResultsPage.manufacturerTab.click();
  await searchResultsPage.selectManufacturer(url);
  // Web-first assertion: confirms we're on the right page and gives a clear
  // failure message if the navigation went somewhere unexpected.
  await expect(page).toHaveURL(url);
});

// Test 01 - Navigate to the Dyson manufacturer page and assert the h1 heading is correct.
test('assert the h1 heading is correct', async ({ page }) => {
  const dysonManufacturerPage = new DysonManufacturerPage(page);

  await expect(dysonManufacturerPage.h1Heading).toBeVisible();
  await expect(dysonManufacturerPage.h1Heading).toContainText('Dyson');
  await expect(dysonManufacturerPage.h1HeadingText).toHaveText('Technology for business');
  await expect(dysonManufacturerPage.h1HeadingText).toBeVisible();
});

// Test 02 - Navigate to the Dyson manufacturer page and assert the telephone number is correct.
test('assert the telephone number is correct', async ({ page }) => {
  const dysonManufacturerPage = new DysonManufacturerPage(page);

  await expect(dysonManufacturerPage.telephoneNumber).toBeVisible();
  await expect(dysonManufacturerPage.telephoneNumber).toBeVisible();
  await expect(dysonManufacturerPage.telephoneNumber).toContainText('08003457788');
  await expect(dysonManufacturerPage.telephoneNumber).toHaveAttribute('href', 'tel:08003457788');
});

// Test 03 - Navigate to the Dyson manufacturer page and assert the website link is correct.
test('assert the website link is correct', async ({ page }) => {
  const dysonManufacturerPage = new DysonManufacturerPage(page);

  await expect(dysonManufacturerPage.websiteLink).toBeVisible();
  await expect(dysonManufacturerPage.websiteLink).toContainText('Website');
  await expect(dysonManufacturerPage.websiteLink).toHaveAttribute('href', 'https://www.dyson.co.uk/commercial/overview');
  await expect(dysonManufacturerPage.websiteLink).toHaveAttribute('target', '_blank');
});

// Test 04 - Navigate to the Dyson manufacturer page and assert company logo is visible and has the correct href.
test('assert the company logo is visible and has the correct alt text', async ({ page }) => {
  const dysonManufacturerPage = new DysonManufacturerPage(page);
  const logoContainer = page.locator('a.brand-primary.wrapper');
  const logoIcon = logoContainer.locator('mat-icon.logo');
  const logoName = logoContainer.locator('app-name');

  await expect(logoContainer).toHaveAttribute("href", '/en/gb');
  await expect(logoIcon).toBeVisible();
  await expect(logoName).toHaveText('NBS Source');
  await expect(logoName).toBeVisible();
});


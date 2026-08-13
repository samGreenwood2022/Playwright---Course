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
  const logoContainer = page.locator('a.brand-primary.wrapper');
  const logoIcon = logoContainer.locator('mat-icon.logo');
  const logoName = logoContainer.locator('app-name');

  await expect(logoContainer).toHaveAttribute("href", '/en/gb');
  await expect(logoIcon).toBeVisible();
  await expect(logoName).toHaveText('NBS Source');
  await expect(logoName).toBeVisible();
});

// Test 05 - Navigate to the Dyson manufacturer page and assert the linked in icon is displayed.
test('assert the LinkedIn icon is displayed', async ({ page }) => {
  const social = page.locator('app-social');
  const linkedInLink = social.getByRole('link', { name: 'Visit LinkedIn' });

  await expect(linkedInLink).toBeVisible();
  await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/dyson/');
  await expect(linkedInLink).toHaveAttribute('target', '_blank');
  await expect(linkedInLink).toHaveAttribute('title', 'Visit LinkedIn');
});

// Test 06 - Navigate to the Dyson manufacturer page and assert the Contact manufacturer button is displayed

test('assert the Contact manufacturer button is displayed', async ({ page }) => {
  const contactManufacturerButton = page.getByRole('button', { name: 'Contact manufacturer' });

  await expect(contactManufacturerButton).toBeVisible();
  await expect(contactManufacturerButton).toHaveAttribute('title', 'Contact Dyson');
});

// Test 07 - Navigate to the Dyson manufacturer page and assert the I'm a manufacturer button is displayed
test('assert the I\'m a manufacturer button is displayed', async ({ page }) => {
  const imAManufacturerButton = page.getByRole('link', { name: 'I\'m a manufacturer' });

  await expect(imAManufacturerButton).toBeVisible();
  await expect(imAManufacturerButton).toHaveText('I\'m a manufacturer');
  await expect(imAManufacturerButton).toHaveAttribute('href', 'https://manufacturers.thenbs.com/nbs-source');
});

// test 08 - Navigate to the Dyson manufacturer page and assert dyson logo is present
test('assert the Dyson logo is present', async ({ page }) => {
  const dysonLogo = page.locator('app-brand-logo.brand-logo-included').getByRole('img');

  await expect(dysonLogo).toBeVisible();
  // screen readers will read the alt text of the image, so we assert that it is correct.
  await expect(dysonLogo).toHaveAttribute('alt', 'Dyson');
});

// Test 09 - Assert that the user can click sign in, go through the sign in process and be returned to the same page they were on before signing in.
test('assert that the user can click sign in, go through the sign in process and be returned to the same page they were on before signing in', async ({ page }) => {
  const signInButton = page.getByRole('button', { name: 'Sign in' });

  await signInButton.click();
});

// Test 10 - Assert the structure of the social media block using an ARIA snapshot.
// Unlike the assertions above, this checks roles, accessible names and nesting in one go:
// a list, containing a listitem, containing a link named 'Visit LinkedIn' pointing at Dyson.
// The match is a subset - the four empty <li> placeholders on the page are ignored.
test('assert the social block structure', async ({ page }) => {
  const social = page.locator('app-social');

  await expect(social).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - link "Visit LinkedIn":
          - /url: https://www.linkedin.com/company/dyson/
  `);
});
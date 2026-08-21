// Import `test` and `expect` from our own fixtures file (not '@playwright/test'
// directly) so tests get access to the custom Page Object fixtures.
import { test, expect } from '../fixtures/test-options';

test.beforeEach(async ({ page, dysonManufacturerPage, nbsHomepage, searchResultsPage }) => {
  // Navigate to the Dyson Manufacturer homepage before each test.
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
test('assert the h1 heading is correct', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.h1Heading).toBeVisible();
  await expect(dysonManufacturerPage.h1Heading).toContainText('Dyson');
  await expect(dysonManufacturerPage.h1HeadingText).toHaveText('Technology for business');
  await expect(dysonManufacturerPage.h1HeadingText).toBeVisible();
});

// Test 02 - Navigate to the Dyson manufacturer page and assert the telephone number is correct.
test('assert the telephone number is correct', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.telephoneNumber).toBeVisible();
  await expect(dysonManufacturerPage.telephoneNumber).toContainText('08003457788');
  await expect(dysonManufacturerPage.telephoneNumber).toHaveAttribute('href', 'tel:08003457788');
});

// Test 03 - Navigate to the Dyson manufacturer page and assert the website link is correct.
test('assert the website link is correct', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.websiteLink).toBeVisible();
  await expect(dysonManufacturerPage.websiteLink).toContainText('Website');
  await expect(dysonManufacturerPage.websiteLink).toHaveAttribute('href', 'https://www.dyson.co.uk/commercial/overview');
  await expect(dysonManufacturerPage.websiteLink).toHaveAttribute('target', '_blank');
});

// Test 04 - Navigate to the Dyson manufacturer page and assert company logo is visible and has the correct href.
test('assert the company logo is visible and has the correct alt text', async ({ basePage }) => {
  await expect(basePage.nbsLogo).toHaveAttribute("href", '/en/gb');
  await expect(basePage.nbsLogo).toBeVisible();
  await expect(basePage.nbsLogo).toContainText('NBS Source');
});

// Test 05 - Navigate to the Dyson manufacturer page and assert the linked in icon is displayed.
test('assert the LinkedIn icon is displayed', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.linkedInIcon).toBeVisible();
  await expect(dysonManufacturerPage.linkedInIcon).toHaveAttribute('href', 'https://www.linkedin.com/company/dyson/');
  await expect(dysonManufacturerPage.linkedInIcon).toHaveAttribute('target', '_blank');
  await expect(dysonManufacturerPage.linkedInIcon).toHaveAttribute('title', 'Visit LinkedIn');
});

// Test 06 - Navigate to the Dyson manufacturer page and assert the Contact manufacturer button is displayed
test('assert the Contact manufacturer button is displayed', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.contactManufacturerCta).toBeVisible();
  await expect(dysonManufacturerPage.contactManufacturerCta).toHaveAttribute('title', 'Contact Dyson');
});

// Test 07 - Navigate to the Dyson manufacturer page and assert the I'm a manufacturer button is displayed
test('assert the I\'m a manufacturer button is displayed', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.imAManufacturerCta).toBeVisible();
  await expect(dysonManufacturerPage.imAManufacturerCta).toHaveText('I\'m a manufacturer');
  await expect(dysonManufacturerPage.imAManufacturerCta).toHaveAttribute('href', 'https://manufacturers.thenbs.com/nbs-source');
});

// test 08 - Navigate to the Dyson manufacturer page and assert dyson logo is present
test('assert the Dyson logo is present', async ({ dysonManufacturerPage }) => {
  await expect(dysonManufacturerPage.dysonLogo).toBeVisible();
  // screen readers will read the alt text of the image, so we assert that it is correct.
  await expect(dysonManufacturerPage.dysonLogo).toHaveAttribute('alt', 'Dyson');
});

// Test 09 - Assert that the user can click sign in, go through the sign in process and be returned to the same page they were on before signing in.
test('assert that the user can click sign in, go through the sign in process and be returned to the same page they were on before signing in', async ({ signInPage }) => {
  await signInPage.signIn();
  await expect(signInPage.page).toHaveURL(signInPage.urlBeforeSignIn, { timeout: 10000 });
  await expect(signInPage.avatar).toBeVisible();

});

// Test 10 - Assert the structure of the social media block using an ARIA snapshot.
// Unlike the assertions above, this checks roles, accessible names and nesting in one go:
// a list, containing a listitem, containing a link named 'Visit LinkedIn' pointing at Dyson.
// The match is a subset - the four empty <li> placeholders on the page are ignored.
test('assert the social block structure', async ({ basePage }) => {
  await expect(basePage.socialMediaIcons).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - link "Visit LinkedIn":
          - /url: https://www.linkedin.com/company/dyson/
  `);
  await expect(basePage.socialMediaIcons).toHaveAttribute('target', '_blank');
});

// Test 11 - Assert the back-to-top button is working as expected.
// This test asserts the back-to-top button is not visible when the page is loaded, 
// then scrolls down the page and asserts the button is visible, clicks the button 
// and asserts the page has scrolled back to the top.
test('assert the back-to-top button is working as expected', async ({ basePage }) => {
  await expect(basePage.backToTopButton).not.toBeVisible();
  await basePage.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(basePage.backToTopButton).toBeVisible();
  await basePage.backToTopButton.click();
  await expect(basePage.backToTopButton).not.toBeVisible();
});

// Test 12 - Assert the main navigation structure (roles, names, order, hrefs) via an ARIA snapshot.
// Using the accessibility tree instead of CSS/HTML locators means order, visibility, accessible
// names and hrefs are all covered by one assertion - and the closed Browse dropdown's category
// links are excluded automatically, since they're not exposed to the accessibility tree while closed
// (unlike a CSS `:visible` check, which doesn't catch how that panel is actually hidden).
test('assert the main navigation structure is correct', async ({ basePage }) => {
  await expect(basePage.mainNav).toMatchAriaSnapshot(`
    - navigation "Main navigation links":
      - link "Home":
        - /url: /en/gb
      - link "What's new":
        - /url: /en/gb/whats-new
      - article:
        - button "Browse"
        - menu "Browse menu"
      - button "BIM Library"
      - link "Inspiration":
        - /url: /en/gb/inspiration
      - link "Collections":
        - /url: /en/gb/collections
      - link "CPD":
        - /url: /en/gb/cpd
  `);
});
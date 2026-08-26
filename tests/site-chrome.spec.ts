// Header/nav/back-to-top are shared site chrome, unaffected by which manufacturer
// or product page you're on - checked once here against a representative page
// rather than duplicated per page-type suite.
import { test, expect } from '../fixtures/test-options';
import { manufacturers } from '../test-data/manufacturers';

const [manufacturer] = manufacturers;

test.beforeEach(async ({ manufacturerPage }) => {
  await manufacturerPage.goto(manufacturer.url);
});

test('NBS logo is visible and links home', async ({ basePage }) => {
  await expect(basePage.nbsLogo).toHaveAttribute('href', '/en/gb');
  await expect(basePage.nbsLogo).toBeVisible();
  await expect(basePage.nbsLogo).toContainText('NBS Source');
});

// This test asserts the back-to-top button is not visible when the page is loaded,
// then scrolls down the page and asserts the button is visible, clicks the button
// and asserts the page has scrolled back to the top.
test('back-to-top button works as expected', async ({ basePage }) => {
  await expect(basePage.backToTopButton).not.toBeVisible();
  await basePage.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(basePage.backToTopButton).toBeVisible();
  await basePage.backToTopButton.click();
  await expect(basePage.backToTopButton).not.toBeVisible();
});

// Checks roles, accessible names, order and hrefs in one go via the accessibility
// tree - the closed Browse dropdown's category links are excluded automatically,
// since they're not exposed to the accessibility tree while closed (unlike a CSS
// `:visible` check, which doesn't catch how that panel is actually hidden).
test('main navigation structure is correct', async ({ basePage }) => {
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

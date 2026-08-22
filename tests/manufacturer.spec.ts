// Data-driven content checks for manufacturer pages. Import `test`/`expect`
// from our fixtures file (not '@playwright/test' directly) so tests get the
// fixture-injected Page Objects.
import { test, expect } from '../fixtures/test-options';
import { manufacturers } from '../test-data/manufacturers';

// One describe block per manufacturer in test-data/manufacturers.ts - add an
// entry there and this whole suite runs against it automatically.
for (const manufacturer of manufacturers) {
  test.describe(`${manufacturer.name} manufacturer page`, () => {
    test.beforeEach(async ({ manufacturerPage }) => {
      await manufacturerPage.goto(manufacturer.url);
    });

    test('h1 heading is correct', async ({ manufacturerPage }) => {
      await expect(manufacturerPage.h1Heading).toBeVisible();
      await expect(manufacturerPage.h1Heading).toContainText(manufacturer.name);
    });

    test('telephone number is correct', async ({ manufacturerPage }) => {
      const telephoneNumber = manufacturerPage.telephoneNumber(manufacturer.telephone);
      await expect(telephoneNumber).toBeVisible();
      await expect(telephoneNumber).toHaveAttribute('href', `tel:${manufacturer.telephone}`);
    });

    test('website link is correct', async ({ manufacturerPage }) => {
      await expect(manufacturerPage.websiteLink).toBeVisible();
      await expect(manufacturerPage.websiteLink).toContainText('Website');
      await expect(manufacturerPage.websiteLink).toHaveAttribute('href', manufacturer.website);
      await expect(manufacturerPage.websiteLink).toHaveAttribute('target', '_blank');
    });

    test('logo is present', async ({ manufacturerPage }) => {
      const logo = manufacturerPage.manufacturerLogo(manufacturer.name);
      await expect(logo).toBeVisible();
      // screen readers will read the alt text of the image, so we assert that it is correct.
      await expect(logo).toHaveAttribute('alt', manufacturer.name);
    });

    test('Contact manufacturer button is displayed', async ({ manufacturerPage }) => {
      await expect(manufacturerPage.contactManufacturerCta).toBeVisible();
      await expect(manufacturerPage.contactManufacturerCta).toHaveAttribute('title', manufacturer.contactCtaTitle);
    });

    test('I\'m a manufacturer button is displayed', async ({ manufacturerPage }) => {
      await expect(manufacturerPage.imAManufacturerCta).toBeVisible();
      await expect(manufacturerPage.imAManufacturerCta).toHaveText('I\'m a manufacturer');
      await expect(manufacturerPage.imAManufacturerCta).toHaveAttribute('href', 'https://manufacturers.thenbs.com/nbs-source');
    });

    // Checks roles, accessible names and nesting in one go: a list, containing a
    // listitem, containing a link named 'Visit LinkedIn' pointing at this manufacturer.
    // The match is a subset - the empty <li> placeholders on the page are ignored.
    test('social block structure is correct', async ({ manufacturerPage }) => {
      await expect(manufacturerPage.linkedInIcon).toBeVisible();
      await expect(manufacturerPage.linkedInIcon).toHaveAttribute('href', manufacturer.linkedIn);
      await expect(manufacturerPage.linkedInIcon).toHaveAttribute('target', '_blank');
      await expect(manufacturerPage.linkedInIcon).toHaveAttribute('title', 'Visit LinkedIn');
    });
  });
}

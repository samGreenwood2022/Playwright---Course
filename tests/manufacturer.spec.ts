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

    // Core tests - assert elements present on every manufacturer page, so
    // they run unconditionally for every entry in test-data/manufacturers.ts.

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

    // Variant tests - only run for elements this manufacturer's fixture entry
    // declares, since not every manufacturer page has every optional element.
    // One test per social link declared in test-data/manufacturers.ts - a
    // manufacturer with no socialLinks simply gets no tests here, rather than
    // failing an assertion that doesn't apply.
    for (const social of manufacturer.socialLinks ?? []) {
      test(`${social.platform} icon is correct`, async ({ manufacturerPage }) => {
        const icon = manufacturerPage.socialIcon(social.platform);
        await expect(icon).toBeVisible();
        await expect(icon).toHaveAttribute('href', social.url);
        await expect(icon).toHaveAttribute('target', '_blank');
        await expect(icon).toHaveAttribute('title', `Visit ${social.platform}`);
      });
    }
  });
}

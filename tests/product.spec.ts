// Data-driven content checks for product pages. Import `test`/`expect` from
// our fixtures file (not '@playwright/test' directly) so tests get the
// fixture-injected Page Objects.
import { test, expect } from '../fixtures/test-options';
import { products } from '../test-data/products';
import { manufacturers } from '../test-data/manufacturers';

// One describe block per product in test-data/products.ts - add an entry
// there and this whole suite runs against it automatically.
for (const product of products) {
  test.describe(`${product.name} product page`, () => {
    test.beforeEach(async ({ productPage }) => {
      await productPage.goto(product.url);
    });

    // Core tests - assert elements present on every product page, so they
    // run unconditionally for every entry in test-data/products.ts. No
    // variant tests yet - once a product-specific optional element is
    // identified, add an optional field to ProductFixture and a guarded
    // loop here, following the pattern in tests/manufacturer.spec.ts.

    test('product heading is correct', async ({ productPage }) => {
      await expect(productPage.productHeading).toBeVisible();
      await expect(productPage.productHeading).toContainText(product.name);
    });

    test('breadcrumb is displayed', async ({ productPage }) => {
      await expect(productPage.breadcrumb(product.breadcrumb)).toBeVisible();
    });

    test('description is displayed', async ({ productPage }) => {
      await expect(productPage.description(product.description)).toBeVisible();
    });

    test('manufacturer telephone and website are correct', async ({ productPage }) => {
      const telephoneNumber = productPage.telephoneNumber(product.telephone);
      await expect(telephoneNumber).toBeVisible();
      await expect(telephoneNumber).toHaveAttribute('href', `tel:${product.telephone}`);

      await expect(productPage.websiteLink).toBeVisible();
      await expect(productPage.websiteLink).toHaveAttribute('href', product.website);
    });

    test('Contact manufacturer button is displayed', async ({ productPage }) => {
      await expect(productPage.contactManufacturerCta).toBeVisible();
      await expect(productPage.contactManufacturerCta).toHaveAttribute('title', product.contactCtaTitle);
    });

    // Cross-checks the two datasets stay in sync: the product's manufacturer
    // link should point at that manufacturer's own page URL.
    test('view more from manufacturer link points to the manufacturer page', async ({ productPage }) => {
      const manufacturer = manufacturers.find(m => m.name === product.manufacturer);
      if (!manufacturer) throw new Error(`No test-data/manufacturers.ts entry for "${product.manufacturer}"`);

      const viewMoreLink = productPage.viewMoreFromManufacturer(product.manufacturerLinkText);
      await expect(viewMoreLink).toBeVisible();
      await expect(viewMoreLink).toHaveAttribute('href', new URL(manufacturer.url).pathname);
    });

    test('data tabs are displayed', async ({ productPage }) => {
      await expect(productPage.specificationDataButton).toBeVisible();
      await expect(productPage.sustainabilityDataButton).toBeVisible();
      await expect(productPage.bimObjectsButton).toBeVisible();
      await expect(productPage.productCertificationsButton).toBeVisible();
    });

    test('add to spec, download BIM and compare actions are available', async ({ productPage }) => {
      await expect(productPage.addToSpecButton).toBeVisible();
      await expect(productPage.downloadBimButton).toBeVisible();
      await expect(productPage.compareAction).toBeVisible();
    });

    test('image gallery is displayed', async ({ productPage }) => {
      await expect(productPage.gallerySlider).toBeVisible();
      await expect(productPage.imageLightboxButton).toBeVisible();
    });

    test('verification status and certificates are displayed', async ({ productPage }) => {
      await expect(productPage.verificationStatus).toBeVisible();
      await expect(productPage.certificateTypes.first()).toBeVisible();
    });
  });
}

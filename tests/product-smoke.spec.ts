// Structural-only checks (no exact expected content), so this suite can scale to
// a much larger sample of product pages than product.spec.ts covers in depth.
// Also runs the (non-failing, reporting-only) accessibility scan per page, since
// that check is content-agnostic too.
import { test, expect } from '../fixtures/test-options';
import { productSmokeUrls } from '../test-data/products';
import { runAxeAccessibilityScan } from '../utils/axe-utils';

for (const url of productSmokeUrls) {
  test(`product page renders and passes a11y scan: ${url}`, async ({ page, productPage }) => {
    await productPage.goto(url);
    await expect(productPage.productHeading).toBeVisible();
    await expect(productPage.websiteLink).toHaveAttribute('href', /^https?:\/\//);
    await expect(productPage.addToSpecButton).toBeVisible();
    await expect(productPage.gallerySlider).toBeVisible();

    await runAxeAccessibilityScan(page, test.info());
  });
}

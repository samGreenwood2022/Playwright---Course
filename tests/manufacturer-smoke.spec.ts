// Structural-only checks (no exact expected content), so this suite can scale to
// a much larger sample of manufacturer pages than manufacturer.spec.ts covers in
// depth. Also runs the (non-failing, reporting-only) accessibility scan per page,
// since that check is content-agnostic too.
import { test, expect } from '../fixtures/test-options';
import { manufacturerSmokeUrls } from '../test-data/manufacturers';
import { runAxeAccessibilityScan } from '../utils/axe-utils';

for (const url of manufacturerSmokeUrls) {
  test(`manufacturer page renders and passes a11y scan: ${url}`, async ({ page, manufacturerPage }) => {
    await manufacturerPage.goto(url);

    // Core assertions only - structural elements guaranteed on every
    // manufacturer page. Variant elements (e.g. social links) aren't checked
    // here since manufacturerSmokeUrls carries no fixture data saying which
    // ones a given URL has - that's what manufacturer.spec.ts's variant
    // tests are for.
    await expect(manufacturerPage.h1Heading).toBeVisible();
    await expect(manufacturerPage.websiteLink).toHaveAttribute('href', /^https?:\/\//);
    await expect(manufacturerPage.contactManufacturerCta).toBeVisible();
    await expect(manufacturerPage.imAManufacturerCta).toBeVisible();

    await runAxeAccessibilityScan(page, test.info());
  });
}

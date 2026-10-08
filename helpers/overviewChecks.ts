import { test, expect, Locator } from '@playwright/test';
import { CompanyOverviewPage } from '../pages/company-overview-page';
import { Company } from '../test-data/companies';

/** How long to wait for an element before reporting it as not found. */
const READ_TIMEOUT = 10_000;

async function readText(locator: Locator): Promise<string | null> {
  return (await locator.innerText({ timeout: READ_TIMEOUT }).catch(() => null))?.trim() ?? null;
}

async function readAttribute(locator: Locator, name: string): Promise<string | null> {
  return locator.getAttribute(name, { timeout: READ_TIMEOUT }).catch(() => null);
}

/**
 * Compares an expected value with the value read from the page. The comparison is shown as a
 * step ("Expected ... | Actual ...") in UI mode and the HTML report, and printed to the console.
 */
async function expectValue(label: string, expected: string, actual: string | null) {
  const shownActual = actual ?? '(not found)';
  console.log(`${label}\n  Expected: ${expected}\n  Actual:   ${shownActual}`);
  await test.step(`${label} | Expected: "${expected}" | Actual: "${shownActual}"`, async () => {
    expect(actual, label).toBe(expected);
  });
}

/**
 * Defines the overview page checks for each company in the list.
 * Optional fields (tagline, phone, website, contactButton, socialLinks)
 * are only checked when they are present in the data.
 */
export function checkOverviewPages(groupName: string, companies: Company[]) {
  for (const company of companies) {
    test.describe(`${groupName} overview: ${company.name}`, () => {
      let overviewPage: CompanyOverviewPage;

      test.beforeEach(async ({ page }) => {
        overviewPage = new CompanyOverviewPage(page);
        await overviewPage.goto(company.path);
      });

      test('shows the name', async () => {
        await expectValue('Name', company.name, await readText(overviewPage.name));
        await expect(overviewPage.name).toBeVisible();
      });

      const { tagline, phone, website, contactButton } = company;

      if (tagline) {
        test('shows the tagline', async () => {
          await expectValue('Tagline', tagline, await readText(overviewPage.tagline));
          await expect(overviewPage.tagline).toBeVisible();
        });
      }

      if (phone) {
        test('shows the phone number', async () => {
          await expectValue('Phone number', phone, await readText(overviewPage.phoneLink));
          await expectValue('Phone link', `tel:${phone}`, await readAttribute(overviewPage.phoneLink, 'href'));
          await expect(overviewPage.phoneLink).toBeVisible();
        });
      }

      if (website) {
        test('shows the website link', async () => {
          await expectValue('Website link', website, await readAttribute(overviewPage.websiteLink, 'href'));
          await expect(overviewPage.websiteLink).toBeVisible();
        });
      }

      if (contactButton) {
        test(`shows the "${contactButton}" button`, async () => {
          await expectValue('Contact button', contactButton, await readText(overviewPage.contactButton));
          await expect(overviewPage.contactButton).toBeVisible();
        });
      }

      for (const social of company.socialLinks ?? []) {
        test(`shows the ${social.platform} link`, async () => {
          const link = overviewPage.socialLink(social.platform);
          await expectValue(`${social.platform} link`, social.url, await readAttribute(link, 'href'));
          await expect(link).toBeVisible();
        });
      }
    });
  }
}

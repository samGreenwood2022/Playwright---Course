import { Locator, Page } from '@playwright/test';

/** Page object for manufacturer and partner overview pages on NBS Source. */
export class CompanyOverviewPage {
  readonly page: Page;
  readonly header: Locator;
  readonly name: Locator;
  readonly tagline: Locator;
  readonly phoneLink: Locator;
  readonly websiteLink: Locator;
  readonly contactButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('app-brand-hero-banner');
    this.name = this.header.getByRole('heading', { level: 1 });
    this.tagline = this.header.locator('.brand-info-container > p').first();
    this.phoneLink = this.header.locator('a[action="telephone"]');
    this.websiteLink = this.header.locator('a[action="company-website"]');
    this.contactButton = this.header.locator('button.contact-button');
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  /** NBS's footer also has social links, but without action="social-media". */
  socialLink(platform: string): Locator {
    return this.page.locator(`a[action="social-media"][title="Visit ${platform}"]`);
  }
}

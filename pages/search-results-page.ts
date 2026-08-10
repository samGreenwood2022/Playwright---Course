import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class SearchResultsPage extends BasePage {
// locators
  readonly manufacturerTab: Locator;
  readonly dysonLink: Locator;

  constructor(page: Page) {
    super(page);
    this.manufacturerTab = page.getByRole('tab', { name: 'Manufacturers' });
    this.dysonLink = page.getByRole('link', { name: 'Dyson Dyson Technology for' });
  }
// Actions

  // Clicks the Dyson manufacturer link and waits for the resulting navigation to
  // finish, so callers land on a fully loaded page before doing anything else.
  async selectManufacturer(expectedUrl: string) {
    await this.dysonLink.click();
    await this.page.waitForURL(expectedUrl);
  }

}
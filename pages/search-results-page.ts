import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class SearchResultsPage extends BasePage {
// locators
  readonly manufacturerTab: Locator;

  constructor(page: Page) {
    super(page);
    this.manufacturerTab = page.getByRole('tab', { name: 'Manufacturers' });
  }
// Actions

  // Result links are only locatable by their manufacturer-specific accessible
  // name, so this is built from data rather than fixed as a class locator.
  manufacturerLink(name: string): Locator {
    return this.page.getByRole('link', { name, exact: false }).first();
  }

  // Clicks the given manufacturer's search result link and waits for the resulting
  // navigation to finish, so callers land on a fully loaded page before doing anything else.
  async selectManufacturer(name: string, expectedUrl: string) {
    await this.manufacturerLink(name).click();
    await this.page.waitForURL(expectedUrl);
  }

}

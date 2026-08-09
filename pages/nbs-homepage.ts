import { BasePage } from './base-page';
import { Page } from '@playwright/test';

// Page Object for the NBS Source homepage.
// Holds the locators and actions specific to this one page.
export class NbsHomepage extends BasePage {

  // Locators
  // Add locators here as page elements are identified, e.g.
  // readonly searchInput = this.page.getByRole('searchbox');

  constructor(page: Page) {
    super(page);
  }

  // Actions

  // Navigates the browser directly to the NBS Source homepage.
  async goto() {
    await this.page.goto('https://source.thenbs.com/en/gb');
  }

}

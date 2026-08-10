import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

// Page Object for the NBS Source homepage.
// Holds the locators and actions specific to this one page.
export class NbsHomepage extends BasePage {
  readonly searchInput: Locator;

  // Locators
  // Add locators here as page elements are identified, e.g.
  // readonly searchInput = this.page.getByRole('searchbox');

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
  }

  // Actions

  // Navigates the browser directly to the NBS Source homepage.
  // '/' resolves against `baseURL` in playwright.config.ts (set from .env).
  async navigateToNbsHomepage() {
    await this.page.goto('/');
  }

}

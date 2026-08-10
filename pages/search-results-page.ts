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



}
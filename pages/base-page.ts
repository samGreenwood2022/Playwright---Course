import { Page } from '@playwright/test';

// Every Page Object in this project extends BasePage, so it's the
// place for anything shared across all pages (common locators, common
// actions like waiting for a spinner to disappear, etc.).
export class BasePage {
    readonly page: Page;

    // Locators
    // (Shared locators used across multiple pages go here)

    constructor(page: Page) {
        // Store the Playwright `page` so child classes can use it
        // via `this.page` without redeclaring it themselves.
        this.page = page;
    }

    // Actions
    // Add reusable actions here that every page should share.

    async assert(){


        
    }

}

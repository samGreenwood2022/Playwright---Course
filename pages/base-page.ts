import { Locator, Page } from '@playwright/test';

// Every Page Object in this project extends BasePage, so it's the
// place for anything shared across all pages (common locators, common
// actions like waiting for a spinner to disappear, etc.).
export class BasePage {
    readonly page: Page;
    readonly nbsLogo: Locator;
    readonly socialMediaIcons: Locator;
    readonly backToTopButton: Locator;
    readonly mainNav: Locator;

    // Locators
    // (Shared locators used across multiple pages go here)

    constructor(page: Page) {
        // Store the Playwright `page` so child classes can use it
        // via `this.page` without redeclaring it themselves.
        this.page = page;
        this.nbsLogo = page.getByRole('link', { name: 'NBS Source' });
        this.socialMediaIcons = page.locator('app-social');
        this.backToTopButton = page.getByRole('button', { name: 'Back to top' });
        this.mainNav = page.getByRole('navigation', { name: 'Main navigation links' });
    }

    // Actions
    // Add reusable actions here that every page should share.

    async assert(){


        
    }

}

import { BasePage } from './base-page';
import { Page, Locator } from '@playwright/test';

// Structural Page Object shared by every manufacturer page - no manufacturer-specific
// text lives here. Expected content per manufacturer comes from test-data/manufacturers.ts.
export class ManufacturerPage extends BasePage {

    readonly h1Heading: Locator;
    readonly websiteLink: Locator;
    readonly linkedInIcon: Locator;
    readonly contactManufacturerCta: Locator;
    readonly imAManufacturerCta: Locator;

    // Locators

    constructor(page: Page) {
        super(page);
        this.h1Heading = page.locator('h1');
        this.websiteLink = page.getByRole('link', { name: 'Website' });
        this.linkedInIcon = page.locator('app-social').getByRole('link', { name: 'Visit LinkedIn' });
        this.contactManufacturerCta = page.getByRole('button', { name: 'Contact manufacturer' });
        this.imAManufacturerCta = page.getByRole('link', { name: 'I\'m a manufacturer' });
    }

    // The telephone link and logo are only locatable by their manufacturer-specific
    // accessible name, so these are built from data rather than fixed as class locators.
    telephoneNumber(number: string): Locator {
        return this.page.getByRole('link', { name: number });
    }

    manufacturerLogo(name: string): Locator {
        return this.page.getByRole('img', { name, exact: true });
    }

    // Actions

    async goto(url: string) {
        await this.page.goto(url);
    }
}

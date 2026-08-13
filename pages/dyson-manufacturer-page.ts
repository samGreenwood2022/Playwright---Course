import { BasePage } from './base-page';
import { Page, Locator } from '@playwright/test';

// Page Object for the Dyson manufacturer page.
// Currently a bare template - add locators and actions as this page is built out.
export class DysonManufacturerPage extends BasePage {

    readonly url = 'https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview';
    readonly h1Heading: Locator;
    readonly h1HeadingText: Locator;
    readonly telephoneNumber: Locator;
    readonly websiteLink: Locator;

    // Locators
    // Add locators here as page elements are identified.

    constructor(page: Page) {
        super(page);
        this.h1Heading = this.page.locator('h1');
        // The h1HeadingText locator matches the text "Technology for business" exactly, so we use the `exact: true` option to ensure that it does not match any other text that contains this phrase.
        this.h1HeadingText = this.page.getByText('Technology for business', { exact: true });
        this.telephoneNumber = this.page.getByRole('link', { name: '08003457788' });
        this.websiteLink = this.page.getByRole('link', { name: 'Website' });
    }

    // Actions

}

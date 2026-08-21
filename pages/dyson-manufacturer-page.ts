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
    readonly linkedInIcon: Locator;
    readonly contactManufacturerCta: Locator;
    readonly imAManufacturerCta: Locator;
    readonly dysonLogo: Locator;

    // Locators
    // Add locators here as page elements are identified.

    constructor(page: Page) {
        super(page);
        this.h1Heading = page.locator('h1');
        // The h1HeadingText locator matches the text "Technology for business" exactly, so we use the `exact: true` option to ensure that it does not match any other text that contains this phrase.
        this.h1HeadingText = page.getByText('Technology for business', { exact: true });
        this.telephoneNumber = page.getByRole('link', { name: '08003457788' });
        this.websiteLink = page.getByRole('link', { name: 'Website' });
        this.linkedInIcon = page.locator('app-social').getByRole('link', { name: 'Visit LinkedIn' });
        this.contactManufacturerCta = page.getByRole('button', { name: 'Contact manufacturer' });
        this.imAManufacturerCta = page.getByRole('link', { name: 'I\'m a manufacturer' });
        this.dysonLogo = page.getByRole('img', {name: 'Dyson'})
    }

    // Actions

}

import { BasePage } from './base-page';
import { Page, Locator } from '@playwright/test';

// Structural Page Object shared by every product page - no product-specific
// text lives here. Expected content per product comes from test-data/products.ts.
export class ProductPage extends BasePage {

    readonly productHeading: Locator;
    readonly verificationStatus: Locator;
    readonly certificateTypes: Locator;
    readonly specificationDataButton: Locator;
    readonly sustainabilityDataButton: Locator;
    readonly bimObjectsButton: Locator;
    readonly productCertificationsButton: Locator;
    readonly addToSpecButton: Locator;
    readonly downloadBimButton: Locator;
    readonly imageLightboxButton: Locator;
    readonly gallerySlider: Locator;
    readonly compareAction: Locator;
    readonly websiteLink: Locator;
    readonly contactManufacturerCta: Locator;

    // Locators

    constructor(page: Page) {
        super(page);
        this.productHeading = page.locator('h1');
        this.verificationStatus = page.locator('cirrus-verification-status');
        this.certificateTypes = page.locator('cirrus-certificate-type');
        this.specificationDataButton = page.getByRole('button', { name: 'Specification data', exact: true });
        this.sustainabilityDataButton = page.locator('cirrus-link-container').getByRole('button', { name: 'Sustainability data' });
        this.bimObjectsButton = page.locator('cirrus-link-container').getByRole('button', { name: 'BIM objects' });
        this.productCertificationsButton = page.locator('cirrus-link-container').getByRole('button', { name: 'Product certifications' });
        this.addToSpecButton = page.getByRole('button', { name: 'Add to spec' });
        this.downloadBimButton = page.getByRole('button', { name: 'Download BIM' }).first();
        this.imageLightboxButton = page.getByRole('button', { name: 'View image lightbox' });
        this.gallerySlider = page.locator('.gallery-slider');
        this.compareAction = page.locator('app-compare-action').filter({ hasText: 'Compare' });
        this.websiteLink = page.getByRole('link', { name: 'Website' });
        this.contactManufacturerCta = page.getByRole('button', { name: 'Contact manufacturer' });
    }

    // The telephone link is only locatable by its manufacturer-specific accessible
    // name, so this is built from data rather than fixed as a class locator.
    telephoneNumber(number: string): Locator {
        return this.page.getByRole('link', { name: number });
    }

    // Accessible name is "View more from <manufacturer>" - the manufacturer portion
    // is rendered lower-case regardless of the manufacturer's display name elsewhere.
    viewMoreFromManufacturer(manufacturerLinkText: string): Locator {
        return this.page.getByRole('link', { name: `View more from ${manufacturerLinkText}` });
    }

    // Scoped to the breadcrumbs component - an unscoped text match also catches
    // unrelated "Home" links in the main/side nav. Callers pass whichever
    // crumb(s) are relevant to their assertion.
    breadcrumb(text: string): Locator {
        return this.page.locator('app-breadcrumbs').getByText(text);
    }

    // Product description has no distinct accessible role either - matched by its text.
    description(text: string): Locator {
        return this.page.getByText(text);
    }

    // Actions

    async goto(url: string) {
        await this.page.goto(url);
    }
}

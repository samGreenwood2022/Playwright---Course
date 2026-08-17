// This file wires our Page Object classes up to Playwright's test runner
// as "fixtures", so tests can request a ready-to-use page object instead
// of building one manually in every test.
import { test as base } from '@playwright/test';
import { NbsHomepage } from '../pages/nbs-homepage';
import { DysonManufacturerPage } from '../pages/dyson-manufacturer-page';
import { SearchResultsPage } from '../pages/search-results-page';
import { BasePage } from '../pages/base-page';

// Declares the names and types of the custom fixtures we're adding.
// Add a new line here whenever a new Page Object is created.
type MyFixtures = {
    nbsHomepage: NbsHomepage;
    dysonManufacturerPage: DysonManufacturerPage;
    searchResultsPage: SearchResultsPage;
    basePage: BasePage;
};

// base.extend() creates our own version of `test` that knows how to
// build each fixture. Playwright only creates a fixture the first time
// a test actually asks for it (lazy loading).
export const test = base.extend<MyFixtures>({
    // `page` here is Playwright's built-in fixture (the browser tab).
    // We use it to construct our Page Object, then hand it to the test via `use`.
    nbsHomepage: async ({ page }, use) => {
        await use(new NbsHomepage(page));
    },
    dysonManufacturerPage: async ({ page }, use) => {
        await use(new DysonManufacturerPage(page));
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
});

// Re-export expect so tests import both `test` and `expect` from here.
export { expect } from "@playwright/test";

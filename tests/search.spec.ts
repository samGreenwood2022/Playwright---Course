// Covers the search -> manufacturer results -> manufacturer page flow once,
// rather than re-running it in every manufacturer.spec.ts test as a setup step.
import { test, expect } from '../fixtures/test-options';
import { manufacturers } from '../test-data/manufacturers';

const [manufacturer] = manufacturers;

test('searching for a manufacturer leads to their page', async ({ page, nbsHomepage, searchResultsPage }) => {
  await nbsHomepage.navigateToNbsHomepage();
  await nbsHomepage.searchInput.click();
  await nbsHomepage.searchInput.fill(manufacturer.name);
  await nbsHomepage.searchInput.press('Enter');
  await searchResultsPage.manufacturerTab.click();
  await searchResultsPage.selectManufacturer(manufacturer.name, manufacturer.url);
  await expect(page).toHaveURL(manufacturer.url);
});

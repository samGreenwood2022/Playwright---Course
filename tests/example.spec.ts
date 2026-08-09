// Import `test` and `expect` from our own fixtures file (not '@playwright/test'
// directly) so tests get access to the custom Page Object fixtures.
import { test, expect } from '../fixtures/test-options';

test('navigate to the NBS homepage', async ({ nbsHomepage, page }) => {
  // `nbsHomepage` is created automatically for us by the fixture -
  // no `new NbsHomepage(page)` needed here.
  await nbsHomepage.goto();

  // Confirm the browser actually landed on the expected page.
  await expect(page).toHaveURL(/source\.thenbs\.com/);
});

// Signs in once via the UI and saves the resulting session (cookies/local
// storage) to disk. Runs as its own Playwright project ("setup") ahead of the
// browser projects (see `dependencies` in playwright.config.ts), so any spec
// can opt into an already-authenticated session via
// `test.use({ storageState: authFile })` instead of repeating the UI login.
import { test as setup, expect } from '../fixtures/test-options';
import { authFile } from '../utils/auth';

setup('authenticate', async ({ nbsHomepage, signInPage }) => {
  await nbsHomepage.navigateToNbsHomepage();
  await signInPage.signIn();
  await expect(signInPage.avatar).toBeVisible({ timeout: 10000 });

  await signInPage.page.context().storageState({ path: authFile });
});

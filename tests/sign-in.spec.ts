// The sign-in button lives in the site header, present on every page, so this
// only needs the homepage loaded - no need for a manufacturer/product page.
import { test, expect } from '../fixtures/test-options';

test.beforeEach(async ({ nbsHomepage }) => {
  await nbsHomepage.navigateToNbsHomepage();
});

// Assert that the user can click sign in, go through the sign in process and
// be returned to the same page they were on before signing in.
test('user can sign in and is returned to the page they were on', async ({ signInPage }) => {
  await signInPage.signIn();
  await expect(signInPage.page).toHaveURL(signInPage.urlBeforeSignIn, { timeout: 10000 });
  await expect(signInPage.avatar).toBeVisible();
});

// Sign-in is page-independent, so this navigates directly to a representative
// manufacturer page rather than going through the search flow (covered in search.spec.ts).
import { test, expect } from '../fixtures/test-options';
import { manufacturers } from '../test-data/manufacturers';

const [manufacturer] = manufacturers;

test.beforeEach(async ({ manufacturerPage }) => {
  await manufacturerPage.goto(manufacturer.url);
});

// Assert that the user can click sign in, go through the sign in process and
// be returned to the same page they were on before signing in.
test('user can sign in and is returned to the page they were on', async ({ signInPage }) => {
  await signInPage.signIn();
  await expect(signInPage.page).toHaveURL(signInPage.urlBeforeSignIn, { timeout: 10000 });
  await expect(signInPage.avatar).toBeVisible();
});

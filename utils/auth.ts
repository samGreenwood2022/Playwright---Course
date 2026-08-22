import path from 'path';

// Storage state saved by tests/auth.setup.ts after a real UI sign-in. Load it
// via `test.use({ storageState: authFile })` in any spec that needs to run as
// an already-signed-in user, instead of driving the UI login flow again.
export const authFile = path.join(__dirname, '..', 'playwright', '.auth', 'user.json');

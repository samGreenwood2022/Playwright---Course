# Playwright POM Framework – Starter Template

A barebones Playwright + TypeScript automation framework, built using the
**Page Object Model (POM)** pattern wired together with Playwright **fixtures**.

This repo is a teaching template. The checklist below tracks what's already
built and what still needs adding — use it as a guide when extending this
framework, or as a reference when building your own from scratch.

## Stack

- [Playwright Test](https://playwright.dev/) (`@playwright/test`)
- TypeScript
- Page Object Model, wired into tests via fixtures (no `new PageObject(page)` in test files)

## Project structure

```
fixtures/       Custom test fixtures - wires Page Objects into `test`
pages/          Page Object classes (one per page/page-type, all extend BasePage)
test-data/      Non-secret expected content per page instance (e.g. per manufacturer)
tests/          Spec files
utils/          Shared test utilities (e.g. accessibility scanning)
playwright.config.ts
tsconfig.json
```

## Setup checklist

### Framework scaffolding — done

- [x] npm project initialised (`package.json`)
- [x] `@playwright/test` installed
- [x] `.gitignore` excludes `node_modules`, `test-results`, `playwright-report`
- [x] `playwright.config.ts` configured (chromium/firefox/webkit projects, HTML reporter, trace on retry)
- [x] `tsconfig.json` added (strict mode)
- [x] npm scripts added (`test`, `test:headed`, `test:ui`, `report`, `codegen`)
- [x] `BasePage` created — holds the shared `page` instance every Page Object extends
- [x] First Page Object created (`NbsHomepage`) extending `BasePage` — has a `searchInput` locator and `navigateToNbsHomepage()` action
- [x] Second Page Object created (`SearchResultsPage`) — `selectManufacturer(link, expectedUrl)` action wraps a click and its resulting `waitForURL`, keeping that mechanics out of the test file
- [x] Generic `ManufacturerPage` Page Object (`pages/manufacturer-page.ts`) — structural only, shared by every manufacturer page; per-manufacturer expected content lives in `test-data/manufacturers.ts` instead of being hardcoded per page
- [x] Generic `ProductPage` Page Object (`pages/product-page.ts`) — same pattern, built from codegen output recorded against a real product page and verified live; per-product expected content lives in `test-data/products.ts`
- [x] Fixtures file created (`fixtures/test-options.ts`) wiring Page Objects into `test`
- [x] Data-driven manufacturer and product content suites (`tests/manufacturer.spec.ts`, `tests/product.spec.ts`) — one `test.describe` per entry in the corresponding `test-data/*.ts` file; adding an entry there gets it the full suite for free
- [x] Structural-only smoke suites (`tests/manufacturer-smoke.spec.ts`, `tests/product-smoke.spec.ts`) for scaling coverage to many more pages without per-page content data
- [x] Search flow, sign-in flow, and site chrome (nav/logo/back-to-top) split into their own spec files (`search.spec.ts`, `sign-in.spec.ts`, `site-chrome.spec.ts`) rather than being re-run as setup for every content test
- [x] Reusable authenticated session (`tests/auth.setup.ts` + `setup` project in `playwright.config.ts`) — signs in once via the UI, saves `storageState` to `playwright/.auth/user.json` (gitignored); any future spec needing to run as a signed-in user uses `test.use({ storageState: authFile })` from `utils/auth.ts` instead of repeating the UI login per test
- [x] `playwright.yml` wired to pass `NBS_USERNAME`/`PASSWORD` into the test step's `env:` (same pattern as `BASE_URL`) — required now the `setup` project performs a real sign-in on every CI run
- [x] CI workflow added (`.github/workflows/playwright.yml`)
- [x] `.env` handling added (`dotenv`) — `.env` is gitignored, `.env.example` is the tracked template
- [x] `baseURL` wired to `.env` (`BASE_URL`) in `playwright.config.ts` — Page Objects use relative `goto('/')`
- [x] `locale`/`timezoneId` set (`en-GB` / `Europe/London`) — Playwright's Chromium defaults to `en-US`, which was tripping the NBS site's region redirect to its US site
- [x] `BASE_URL` added as a GitHub Actions repository secret and passed into the test step via `env:` in `playwright.yml` — CI has no `.env` file, so this is required for `baseURL` to resolve there
- [x] GitHub Actions bumped to versions targeting Node 24 (`actions/checkout@v7`, `actions/setup-node@v7`, `actions/upload-artifact@v7`), clearing the Node 20 deprecation warning
- [x] `dotenv` startup noise silenced with `quiet: true` in `playwright.config.ts`
- [x] Playwright browsers cached in CI (`actions/cache`, keyed on `package-lock.json`) — skips the browser download on cache hits, speeding up the pipeline
- [x] `@axe-core/playwright` installed — accessibility scans run via `utils/axe-utils.ts` and attach results (violation count + full JSON) to the HTML report; deliberately non-failing since existing site issues aren't being fixed and shouldn't fail the pipeline

### Still to build out

- [ ] Grow `manufacturers`/`manufacturerSmokeUrls` and `products`/`productSmokeUrls` beyond one entry each (currently identical to their respective content lists) — decide how the smoke lists get sourced at scale (hardcoded list vs. pulled from a sitemap/API)
- [ ] **Add the actual `NBS_USERNAME`/`PASSWORD` secret values in the GitHub repo settings** (Settings → Secrets and variables → Actions) — `playwright.yml` now references them, but CI will fail on the `setup` project until the real values are added there (this is a repo-settings action, not something fixable in code)
- [ ] Add more example tests demonstrating common patterns (hooks, tags)
- [ ] Agree and document locator/action naming conventions
- [ ] Agree on assertion conventions (built-in `expect` vs custom matchers)

## Comment style used in this repo

Keep this consistent as the framework grows:

- One short comment above each file/class explaining what it's for.
- `// Locators` and `// Actions` as section headers inside every Page Object, indented to match the class body.
- Comments explain **why**, not what — skip anything that just restates the code below it.

## Environment variables / secrets

Secrets (URLs, usernames, passwords, API keys) live in a local `.env` file,
loaded via `dotenv` in `playwright.config.ts`. `.env` is gitignored — never
commit it.

Setup: copy `.env.example` to `.env` and fill in real values.

```
cp .env.example .env
```

Access variables in code via `process.env.VARIABLE_NAME`. Whenever you add
a new variable, add its key (no value) to `.env.example` too, so the
template stays up to date for anyone else setting up the project.

## Running tests

```
npm test           # run all tests
npm run test:headed  # run with the browser visible
npm run test:ui      # run in Playwright's UI mode
npm run report        # open the last HTML report
```

## Generating locators with codegen

Playwright's codegen tool opens a browser, records your clicks/inputs, and
writes the locator code for you — a good starting point for filling in a
Page Object's `// Locators` and `// Actions` sections.

```
npm run codegen -- https://source.thenbs.com/en/gb
```

The `--` is required so npm passes the URL through to codegen instead of
treating it as an npm flag.

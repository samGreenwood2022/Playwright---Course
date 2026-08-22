# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A teaching template for a Playwright + TypeScript automation framework, built around the Page Object Model (POM) pattern wired together with Playwright fixtures. Tests exercise the NBS Source site (`https://source.thenbs.com/en/gb`), covering the homepage search flow, manufacturer pages, and product pages via generic, data-driven Page Objects (currently one manufacturer and one product — Dyson — in the test data).

## Commands

```
cp .env.example .env          # one-time setup - fill in BASE_URL (and USERNAME/PASSWORD when needed)

npm test                      # run all tests (all 3 browser projects)
npm run test:headed           # run with the browser visible
npm run test:ui               # run in Playwright's UI mode
npm run report                # open the last HTML report
npm run codegen -- <url>      # record actions and generate locator code (note the `--`)

npx playwright test <file>                    # run a single spec file
npx playwright test -g "<test name>"          # run a single test by title
npx playwright test --project=chromium        # run against one browser only
npx tsc --noEmit                              # type-check without emitting
```

There is no lint script configured.

## Architecture

- `fixtures/test-options.ts` — extends Playwright's `test` with custom fixtures, one per Page Object (`nbsHomepage`, `searchResultsPage`, `manufacturerPage`, `productPage`, `basePage`, `signInPage`). Tests should import `test`/`expect` from here, not from `@playwright/test`, so they get the injected page objects instead of constructing `new PageObject(page)` manually.
- `pages/base-page.ts` — `BasePage` holds the shared `page` instance; every Page Object extends it. Shared locators/actions common to all pages (site chrome: nav, logo, back-to-top, social icons) belong here.
- `pages/manufacturer-page.ts`, `pages/product-page.ts` — one **generic, structural** Page Object per page-type, shared by every manufacturer/product page on the site (thousands of them, all sharing the same layout). They hold no manufacturer/product-specific text. Locators whose only accessible name *is* content-specific (a phone link, a logo, the "View more from &lt;manufacturer&gt;" link) are exposed as methods (e.g. `telephoneNumber(number)`, `manufacturerLogo(name)`, `viewMoreFromManufacturer(name)`) that take the expected value as a parameter, rather than being fixed locators. When adding locators here, verify them against the live site (`npx playwright test -g "<name>"`) rather than trusting codegen output as-is — codegen's recorded names/selectors can be ambiguous once real page content is present (e.g. an unscoped `getByRole('img', {name})` without `exact: true`, or an unscoped `getByText()` matching more than the intended element) and won't surface a strict-mode violation until run against the real page.
- `test-data/manufacturers.ts`, `test-data/products.ts` — non-secret, per-instance expected values (`ManufacturerFixture[]`, `ProductFixture[]`), kept out of the Page Objects so adding a manufacturer/product means adding a data entry, not writing new test code. `manufacturerSmokeUrls`/`productSmokeUrls` are lighter parallel lists (URL only) for structural-only smoke coverage at larger scale.
- `pages/*.ts` — one Page Object per page/page-type (`NbsHomepage`, `SearchResultsPage`, `ManufacturerPage`, `ProductPage`, `SignInPage`), each with `// Locators` and `// Actions` sections. Keep that section-header convention when adding to them.
- `tests/*.spec.ts` — spec files, split by concern rather than one monolithic flow:
  - `manufacturer.spec.ts`, `product.spec.ts` — data-driven, one `test.describe` per entry in the corresponding `test-data/*.ts` file, full content assertions (`goto`'s the page URL directly).
  - `manufacturer-smoke.spec.ts`, `product-smoke.spec.ts` — loop the corresponding smoke URL list, structural-only assertions (no exact expected content) plus the accessibility scan, so they can scale to a much larger sample of pages than the content suites.
  - `search.spec.ts` — the search → results → manufacturer-page navigation flow, tested once (not re-run as setup for every content test).
  - `sign-in.spec.ts`, `site-chrome.spec.ts` — page-independent flows/chrome, each navigates directly to one representative manufacturer page rather than depending on the search flow.
- `playwright.config.ts` — loads `.env` via `dotenv`; `baseURL` comes from `BASE_URL` so Page Objects use relative `goto('/')`. `locale`/`timezoneId` are pinned to `en-GB`/`Europe/London` because Chromium's default `en-US` locale triggers this site's US redirect. Projects: chromium, firefox, webkit.
- `.github/workflows/playwright.yml` — CI. `BASE_URL` is passed in via a GitHub Actions secret (no `.env` on CI).

## Conventions

- Never construct Page Objects with `new PageObject(page)` inside test files where a fixture exists — request them as fixture arguments instead.
- Every new page under test gets its own Page Object (extending `BasePage`) plus a corresponding fixture entry in `fixtures/test-options.ts`.
- Inside each Page Object: a `// Locators` section and a `// Actions` section, indented to match the class body. Comments explain *why*, not what — skip anything that just restates the code below it.
- Secrets/config go through `.env` (gitignored) via `process.env.VARIABLE_NAME`; whenever a new variable is added, also add its key (no value) to `.env.example`.
- Prefer web-first assertions (`await expect(locator)...`) over manual waits.

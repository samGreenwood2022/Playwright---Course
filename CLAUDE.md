# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A teaching template for a Playwright + TypeScript automation framework, built around the Page Object Model (POM) pattern wired together with Playwright fixtures. Tests currently exercise the NBS Source site (`https://source.thenbs.com/en/gb`), navigating from the homepage search through to a manufacturer page (Dyson).

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

- `fixtures/test-options.ts` — extends Playwright's `test` with custom fixtures, one per Page Object (`nbsHomepage`, `searchResultsPage`, `dysonManufacturerPage`, `basePage`). Tests should import `test`/`expect` from here, not from `@playwright/test`, so they get the injected page objects instead of constructing `new PageObject(page)` manually. **Note:** `first-test.spec.ts` currently still constructs page objects manually in `beforeEach`/tests rather than using the fixtures — migrating it to the fixture-injected objects is an open item (see README checklist).
- `pages/base-page.ts` — `BasePage` holds the shared `page` instance; every Page Object extends it. Shared locators/actions common to all pages belong here.
- `pages/*.ts` — one Page Object per page (`NbsHomepage`, `SearchResultsPage`, `DysonManufacturerPage`), each with `// Locators` and `// Actions` sections. Keep that section-header convention when adding to them.
- `tests/*.spec.ts` — spec files. `first-test.spec.ts` drives NBS homepage → search → Dyson manufacturer page in `beforeEach`, then each `test()` asserts one piece of the manufacturer page.
- `playwright.config.ts` — loads `.env` via `dotenv`; `baseURL` comes from `BASE_URL` so Page Objects use relative `goto('/')`. `locale`/`timezoneId` are pinned to `en-GB`/`Europe/London` because Chromium's default `en-US` locale triggers this site's US redirect. Projects: chromium, firefox, webkit.
- `.github/workflows/playwright.yml` — CI. `BASE_URL` is passed in via a GitHub Actions secret (no `.env` on CI).

## Conventions

- Never construct Page Objects with `new PageObject(page)` inside test files where a fixture exists — request them as fixture arguments instead.
- Every new page under test gets its own Page Object (extending `BasePage`) plus a corresponding fixture entry in `fixtures/test-options.ts`.
- Inside each Page Object: a `// Locators` section and a `// Actions` section, indented to match the class body. Comments explain *why*, not what — skip anything that just restates the code below it.
- Secrets/config go through `.env` (gitignored) via `process.env.VARIABLE_NAME`; whenever a new variable is added, also add its key (no value) to `.env.example`.
- Prefer web-first assertions (`await expect(locator)...`) over manual waits.

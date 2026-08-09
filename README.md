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
pages/          Page Object classes (one per page, all extend BasePage)
tests/          Spec files
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
- [x] npm scripts added (`test`, `test:headed`, `test:ui`, `report`)
- [x] `BasePage` created — holds the shared `page` instance every Page Object extends
- [x] First Page Object created (`NbsHomepage`) extending `BasePage`
- [x] Fixtures file created (`fixtures/test-options.ts`) wiring Page Objects into `test`
- [x] Example test using a fixture (`tests/example.spec.ts`)
- [x] CI workflow added (`.github/workflows/playwright.yml`)

### Still to build out

- [ ] Add locators and actions to `DysonManufacturerPage`
- [ ] Add a Page Object + fixture for every new page under test
- [ ] Add page-specific assertions/checks (rather than generic ones in test files)
- [ ] Decide on test data handling (e.g. a `test-data/` folder, or `.env` for environment config)
- [ ] Add a `baseURL` to `playwright.config.ts` once a fixed test environment is agreed
- [ ] Add more example tests demonstrating common patterns (data-driven tests, hooks, tags)
- [ ] Agree and document locator/action naming conventions
- [ ] Agree on assertion conventions (built-in `expect` vs custom matchers)

## Comment style used in this repo

Keep this consistent as the framework grows:

- One short comment above each file/class explaining what it's for.
- `// Locators` and `// Actions` as section headers inside every Page Object, indented to match the class body.
- Comments explain **why**, not what — skip anything that just restates the code below it.

## Running tests

```
npm test           # run all tests
npm run test:headed  # run with the browser visible
npm run test:ui      # run in Playwright's UI mode
npm run report        # open the last HTML report
```

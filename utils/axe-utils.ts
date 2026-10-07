import AxeBuilder from '@axe-core/playwright';
import { Page, TestInfo } from '@playwright/test';

// Runs an Axe accessibility scan on the current page and attaches the full
// results to the test report, without failing the test on violations found -
// the dev team isn't fixing existing issues, so this is reporting-only.
export async function runAxeAccessibilityScan(page: Page, testInfo: TestInfo) {
    const results = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(results, null, 2),
        contentType: 'application/json',
    });

    console.log(`Accessibility scan found ${results.violations.length} violation(s). See the HTML report attachment for details.`);

    return results;
}

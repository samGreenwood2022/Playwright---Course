// Non-secret test data for manufacturer pages, kept separate from the Page
// Object so the same generic ManufacturerPage / spec files can cover every
// manufacturer just by adding an entry here.
export type ManufacturerFixture = {
    name: string;
    url: string;
    telephone: string;
    website: string;
    linkedIn: string;
    contactCtaTitle: string;
};

export const manufacturers: ManufacturerFixture[] = [
    {
        name: 'Dyson',
        url: 'https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview',
        telephone: '08003457788',
        website: 'https://www.dyson.co.uk/commercial/overview',
        linkedIn: 'https://www.linkedin.com/company/dyson/',
        contactCtaTitle: 'Contact Dyson',
    },
    // Add more manufacturers here as they're brought under test - each one
    // gets the full content-assertion suite in tests/manufacturer.spec.ts for free.
];

// Lighter-weight list for tests/manufacturer-smoke.spec.ts - just enough to
// navigate and check the page renders, no expected content required. Grow this
// list independently of `manufacturers` above (e.g. from a sitemap dump) once
// broader, content-agnostic coverage is wanted across more pages.
export const manufacturerSmokeUrls: string[] = manufacturers.map(m => m.url);

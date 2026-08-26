// Non-secret test data for manufacturer pages, kept separate from the Page
// Object so the same generic ManufacturerPage / spec files can cover every
// manufacturer just by adding an entry here.
export type ManufacturerFixture = {
    name: string;
    url: string;
    telephone: string;
    website: string;
    contactCtaTitle: string;
    // Not every manufacturer page shows the same set of social icons - only
    // declare the ones this manufacturer actually has, and
    // tests/manufacturer.spec.ts will generate one test per entry here.
    // Platform name must match the site's "Visit <platform>" accessible name.
    socialLinks?: { platform: string; url: string }[];
};

export const manufacturers: ManufacturerFixture[] = [
    {
        name: 'Dyson',
        url: 'https://source.thenbs.com/en/gb/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview',
        telephone: '08003457788',
        website: 'https://www.dyson.co.uk/commercial/overview',
        contactCtaTitle: 'Contact Dyson',
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/dyson/' },
        ],
    },
    // Add more manufacturers here as they're brought under test - each one
    // gets the full content-assertion suite in tests/manufacturer.spec.ts for
    // free. Pick manufacturers so the union of their socialLinks (and any
    // future optional fields) covers every variant element worth testing -
    // one feature-rich entry plus one or two covering whatever it lacks.
];

// Lighter-weight list for tests/manufacturer-smoke.spec.ts - just enough to
// navigate and check the page renders, no expected content required. Grow this
// list independently of `manufacturers` above (e.g. from a sitemap dump) once
// broader, content-agnostic coverage is wanted across more pages.
export const manufacturerSmokeUrls: string[] = manufacturers.map(m => m.url);

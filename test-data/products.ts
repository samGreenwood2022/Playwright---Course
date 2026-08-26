// Non-secret test data for product pages, kept separate from the Page Object
// so the same generic ProductPage / spec files can cover every product just
// by adding an entry here.
export type ProductFixture = {
    name: string;
    url: string;
    manufacturer: string;
    // Accessible name suffix on the "View more from <x>" link - confirmed live
    // to be lower-case regardless of the manufacturer's display name elsewhere.
    manufacturerLinkText: string;
    telephone: string;
    website: string;
    description: string;
    breadcrumb: string;
    contactCtaTitle: string;
};

export const products: ProductFixture[] = [
    {
        name: 'Dyson Airblade™ 9kJ Hand Dryer (HU03)',
        url: 'https://source.thenbs.com/en/gb/product/dyson-airblade-9kj-hand-dryer-hu03/fmdLoC3ZGuYUyy8pKSG7Au/jmJPorRKb1DV8KXyP2uCS3',
        manufacturer: 'Dyson',
        manufacturerLinkText: 'dyson',
        telephone: '08003457788',
        website: 'https://www.dyson.co.uk/commercial/overview',
        description: 'A touch-free hand dryer which protrudes just 100 mm from the wall, drying hands hygienically in 10–12 seconds, using 9.1 kilojoules of energy per dry.',
        breadcrumb: 'Home',
        contactCtaTitle: 'Contact Dyson',
    },
    // Add more products here as they're brought under test - each one gets
    // the full content-assertion suite in tests/product.spec.ts for free.
];

// Lighter-weight list for tests/product-smoke.spec.ts - just enough to
// navigate and check the page renders, no expected content required.
export const productSmokeUrls: string[] = products.map(p => p.url);

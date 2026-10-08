import * as fs from 'fs';
import * as path from 'path';

export interface SocialLink {
  /** Platform name as shown in the link title, e.g. "Visit LinkedIn" */
  platform: string;
  url: string;
}

/** Expected content of a company overview page (manufacturer or partner). */
export interface Company {
  name: string;
  /** Path to the overview page, relative to baseURL */
  path: string;
  tagline?: string;
  phone?: string;
  website?: string;
  /** Label of the header contact button, e.g. "Contact certification body" */
  contactButton?: string;
  socialLinks?: SocialLink[];
}

/** Reads a list of companies from a JSON file in the test-data folder. */
export function loadCompanies(fileName: string): Company[] {
  return JSON.parse(fs.readFileSync(path.join(__dirname, fileName), 'utf-8'));
}

import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { expect } from '@playwright/test';

export class SignInPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly nextButton: Locator;
    readonly urlBeforeSignIn: string;
    readonly avatar: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.urlBeforeSignIn = page.url();
        this.avatar = page.getByRole('figure', { name: 'Avatar for TJ Hooker' });
    }

    async signIn() {
        await this.signInButton.click();
        await this.emailInput.fill(process.env.NBS_USERNAME!);
        await this.nextButton.click();
        await this.passwordInput.fill(process.env.PASSWORD!);
        await this.signInButton.click();
    }
}
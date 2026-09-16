import { expect } from '@playwright/test';
import { URLs, credentials } from '../test-data/credentials';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('input[type="email"]');
    this.passwordField = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(URLs.login);
    await expect(this.loginButton).toBeVisible();
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async assertDashboardLoaded() {
    await expect(this.page).toHaveURL(URLs.dashboard);
    await this.page.screenshot({ path: 'screenshots/dashboard.png' });
  }
}
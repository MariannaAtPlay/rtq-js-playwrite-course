import { expect } from '@playwright/test';
import { URLs, credentials } from '../test-data/credentials';

export class DashboardPage {
  constructor(page) {
	this.page = page;
	this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
	this.accountsLink = page.getByRole('link', { name: 'Accounts' });
	this.searchBar = page.getByRole('textbox', { name: 'Search' });
    this.overviewHeading = page.getByRole('heading', { name: 'Overview' });
    this.accountBalance =  page.locator('small:has-text("Account Balance") + p');
  }

  async assertLoaded() {
	await expect(this.page).toHaveURL(URLs.dashboard);
	await expect(this.overviewHeading).toBeVisible();
	await expect(this.accountBalance).toBeVisible();
  }

  async clickAccounts() {
    await this.accountsLink.click();
  }

  async getDefaultAccountNumber() {
    return await this.page.locator('p:has-text("Account Number") + div p').first().innerText();
  }

  async clickDashboard() {
    await this.dashboardLink.click();
  }

  async searchFor(text) {
    await this.searchBar.fill(text);
    await this.searchBar.press('Enter');
    await this.page.screenshot({ path: 'screenshots/search.png' });
  }
}
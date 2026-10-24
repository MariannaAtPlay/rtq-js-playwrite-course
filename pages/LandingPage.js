import { expect } from '@playwright/test';
import { URLs } from '../test-data/credentials';

export class LandingPage {
  constructor(page) {
    this.page = page;
    this.heroText = page.getByRole('heading', { name: /Manage Your Finances Seamlessly/i });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.heroGetStarted = page.getByRole('button', { name: 'Get Started' }).first();
    this.bottomGetStarted = page.getByRole('button', { name: 'Get Started' }).nth(1);
  }

  async goto() {
    await this.page.goto(URLs.landing);
  }

  async assertLandingLoaded() {
    await expect(this.page).toHaveURL(URLs.landing);
    await expect(this.heroText).toBeVisible();
    await expect(this.loginLink).toBeVisible();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickHeroGetStarted() {
    await this.heroGetStarted.click();
  }

  async clickBottomGetStarted() {
    await this.bottomGetStarted.click();
  }

  async goBackToLanding() {
    await expect(this.page).toHaveURL(URLs.login);
    await this.page.goBack();
    await expect(this.page).toHaveURL(URLs.landing);
  }
}
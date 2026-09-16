import { test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../test-data/credentials';

test('Login flow – Invalid attempts then valid login', async ({ page }) => {
  const landing = new LandingPage(page);
  const login = new LoginPage(page);

  // Step 1: Go to the landing page
  await landing.goto();
  await landing.assertLandingLoaded();

  // Step 2: Navigate to login
  await landing.clickLogin();
  await login.assertLoaded();

  // Step 3: Try invalid logins
  for (const user of credentials.invalid) {
    await login.login(user.email, user.password);
  }

  // Step 4: Try valid login
  await login.login(credentials.valid.email, credentials.valid.password);

  // Step 5: Assert that dashboard loaded and capture screenshot
  await login.assertDashboardLoaded();
});

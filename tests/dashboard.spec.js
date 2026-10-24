import { test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { credentials } from '../test-data/credentials';

test('Dashboard flow – Search for account numbber', async ({ page }) => {
  const landing = new LandingPage(page);
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  // Step 1: Go to the landing page
  await landing.goto();
  await landing.assertLandingLoaded();
  console.log('🧭 Step 1: Navigate to landing page');

  // Step 2: Navigate to login
  await landing.clickLogin();
  await login.assertLoaded();
  console.log('🧭 Step 2: Navigate to login');

  // Step 3: Try valid login
  await login.login(credentials.valid.email, credentials.valid.password);
  console.log('🧭 Step 3: Login with valid credentials');

  // Step 4: Assert that dashboard loaded and capture screenshot
  await dashboard.assertLoaded();
  console.log('🧭 Step 4: Assert dashboard loaded');

  // Step 5: Click on Accounts link
  await dashboard.clickAccounts();
  const accountNumber = await dashboard.getDefaultAccountNumber();
  console.log('🧭 Step 5: Get default account number:', accountNumber);

  // Step 6: Go back to dashboard
  await dashboard.clickDashboard();
  console.log('🧭 Step 6: Navigate back to dashboard');

  // Step 7: Search for the default account number
  await dashboard.searchFor(accountNumber);
  console.log('🧭 Step 7: Search for the default account number');

  console.log('🎯 Test completed successfully!');
});

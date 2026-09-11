import { test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test('Landing Page – Navigation Assertions & Actions', async ({ page }) => {
  const landing = new LandingPage(page);

  console.log('🧭 Step 1: Navigate to landing page');
  await landing.goto();

  console.log('✅ Step 2: Assert landing page is loaded');
  await landing.assertLandingLoaded();

  console.log('🧩 Step 3: Click Login and navigate back');
  await landing.clickLogin();
  await landing.goBackToLanding();

  console.log('🚀 Step 4: Click hero “Get Started”');
  await landing.clickHeroGetStarted();
  await landing.goBackToLanding();

  console.log('🔄 Step 5: Click bottom “Get Started” and return');
  await landing.clickBottomGetStarted();
  await landing.goBackToLanding();

  console.log('🎯 Test completed successfully!');
});

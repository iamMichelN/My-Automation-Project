import { test, expect } from '@playwright/test';

// Describing all the positive tests
test.describe('Positive Login Tests', () => {
  const validUsers = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'visual_user',
  ];

  const validPassword = 'secret_sauce';

  // Testing each user that's in the validUsers array
  for (const username of validUsers) {
    test(`Validate login for ${username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');

      // Filling in both username and password
      await page.fill('#user-name', username);
      await page.fill('#password', validPassword);

      // Clicking on the login button
      await page.click('#login-button');

      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page).toHaveTitle('Swag Labs');

      await expect(page.locator('.title')).toHaveText('Products');

      // Logging out
      await page.click('#react-burger-menu-btn');
      await page.click('#logout_sidebar_link');
    });
  }
});

import { test, expect } from '@playwright/test';

test.describe('Negative Login Scenarios', () => {
  // Test 1 : Username correct & Password incorrect
  test('Username correct + Password incorrect', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');

    // Validating error message
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // Test 2 : Username incorrect & Password correct
  test('Username incorrect + Password correct', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'wrong_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Validating error message
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // Test 3 : Username incorrect & Password incorrect
  test('Username incorrect + Password incorrect', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'wrong_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');

    // Validating error message
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // Test 4 : Username empty & Password correct
  test('Username empty + Password correct', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', '');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Validating error message
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username is required'
    );
  });

  // Test 5 : Username correct & Password empty
  test('Username correct + Password empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', '');
    await page.click('[data-test="login-button"]');

    // Validating error message
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Password is required'
    );
  });

  // Test 6 : Username empty & Password empty
  test('Username empty + Password empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', '');
    await page.fill('[data-test="password"]', '');
    await page.click('[data-test="login-button"]');

    // Validating error message
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username is required'
    );
  });
});

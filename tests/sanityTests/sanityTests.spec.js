import { test, expect } from '@playwright/test';

test.describe('Sanity Tests: Swag Labs', () => {
  // Test 1 : Logging in
  test('Validate Login and Inventory Page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Logging in
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');

    // Clicking on the login button
    await page.click('[data-test="login-button"]');

    // Checking if the URL is correct after logging in
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Validating the title of the page
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // Test 2 : Adding two items
  test('Add Products and Validate Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Logging in
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Adding two items
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // Validating cart icon shows 2 items
    const cartCount = await page.locator('.shopping_cart_badge').textContent();
    expect(cartCount).toBe('2');

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.title')).toHaveText('Your Cart');
  });

  // Test 3 : Checkout Step One
  test('Checkout Step One Validation', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Logging in and adding items to the cart
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    // Validating Checkout Step One
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html'
    );
    await expect(page.locator('.title')).toHaveText(
      'Checkout: Your Information'
    );

    // Filling in the form and continuing to the next step
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
  });

  // Test 4 : Checkout Step Two
  test('Checkout Step Two Validation', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Logging in, adding items to the cart and continuing to checkout
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // Validating Checkout Step Two
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html'
    );
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    // Finishing the purchase
    await page.click('[data-test="finish"]');

    // Validating completion
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html'
    );
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    await expect(page.locator('.complete-header')).toHaveText(
      'Thank you for your order!'
    );
    await expect(page.locator('.complete-text')).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  });
});

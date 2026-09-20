import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/SchoolName/);
  await expect(page.locator('h1')).toContainText('Building Future Leaders');
});

test('navigation to about page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
  await expect(page.locator('h1')).toContainText('About Our School');
});

test('navigation to admissions page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Admissions');
  await expect(page).toHaveURL('/admissions');
  await expect(page.locator('h1')).toContainText('Admissions');
});

test('login page loads', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h1')).toContainText('Welcome Back');
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
});

test('mobile navigation works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.click('button[aria-label="Toggle menu"]');
  await expect(page.locator('text=About')).toBeVisible();
  await expect(page.locator('text=Contact')).toBeVisible();
});

import { test, expect } from '@playwright/test';

test('EPAM: navigate to Services -> Explore Our Client Work and verify Client Work text', async ({ page }) => {
  // Navigate to EPAM home page
  await page.goto('https://www.epam.com/');
  await page.waitForLoadState('domcontentloaded');

  // Open the hamburger menu if present (responsive)
  const hamburger = page.getByRole('button', { name: /menu/i });
  if (await hamburger.count() > 0) {
    await hamburger.first().click();
  }

  // Click "Services" in the header
  const services = page.getByRole('link', { name: /^Services$/i }).first();
  await services.click();

  // Click "Explore Our Client Work" (with fallback to partial match)
  let explore = page.getByRole('link', { name: /Explore Our Client Work/i });
  if (await explore.count() === 0) explore = page.getByRole('link', { name: /Client Work/i });
  await explore.first().click();

  // Verify that "Client Work" text is visible on the page
  await expect(page.getByText(/Client Work/i)).toBeVisible();
});
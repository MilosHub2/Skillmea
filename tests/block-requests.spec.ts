import { test } from '@playwright/test';

test('Block requests', async ({ page, context }) => {
  await context.route(/\.(jpg|png|css)$/, route => route.abort());
  await page.goto('/');
  await page.waitForURL('/');
});
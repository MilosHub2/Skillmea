import { test } from '@playwright/test';

test('Block requests', async ({ page, context }) => {
  await context.route(/\.(jpg|png|css)$/, route => route.abort());
  await page.goto('https://restful-booker.herokuapp.com');
  await page.waitForURL('https://restful-booker.herokuapp.com');
});
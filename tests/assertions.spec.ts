import { test, expect } from '@playwright/test';

test('Assertions', async ({page}) => {
    await page.goto('http://www.saucedemo.com');
    await expect(page.locator('#user-name')).toBeVisible();
    await expect.soft(page.locator('#password')).not.toBeEditable();
    await expect(page.locator('#login-button')).toHaveCount(1); //ze sa nachadza len raz 
    await expect(page.locator('skillmea')).not.toBeVisible(); // ze sa nenachadza 
});
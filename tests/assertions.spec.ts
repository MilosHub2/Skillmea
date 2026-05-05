import { test, expect } from '@playwright/test';

test('Assertions', async ({page}) => {
    await page.goto('http://www.saucedemo.com');
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeEditable();         // await expect.soft(page.locator('#password')).not.toBeEditable(); takto som mal predtym aby zamerne padol ale pre soft pokracuje dalej 
    await expect(page.locator('#login-button')).toHaveCount(1);             //ze sa nachadza len raz 
    await expect(page.locator('skillmea')).not.toBeVisible();               // ze sa nenachadza 
});
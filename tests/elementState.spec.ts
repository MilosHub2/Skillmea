import { test, expect } from '@playwright/test';


test('Element state test', async ({page}) => {
    await page.goto('http://www.saucedemo.com');
    console.log(await page.locator('#user-name').isEditable());
    console.log(await page.locator('#password').isVisible());
    console.log(await page.locator('#login-button').isHidden());
})
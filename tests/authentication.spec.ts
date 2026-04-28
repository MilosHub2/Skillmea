import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/login');
});

test.describe('Authentication', ()=> {
    test('Succesful login', async ({ page }) => {
        //await expect(page.getByText('Milanco')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    });

});
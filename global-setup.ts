import { chromium } from "@playwright/test";

async function globalSetup() {
    const browser = await chromium.launch({ headless: true});       //headles true aby sa to robilo bez browseru otvorenia
    const page = await browser.newPage();                           //vytvorime objekt novej stranky

    await page.goto('https://demoqa.com/login');
    await page.getByPlaceholder('UserName').fill('Milanco');
    await page.getByPlaceholder('Password').fill('Password666*');
    await page.getByRole('button', { name: 'Login' }).click();      //Login je text v elemente button
    // checked logged in
    await page.waitForURL('https://demoqa.com/profile');

    await page.context().storageState({ path: './loginAuth.json'});
    await browser.close();

};

export default globalSetup;
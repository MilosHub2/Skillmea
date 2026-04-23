import test, {expect} from '../fixtures/basePages';

test.describe('Tabs', () => {

  test('Multi tabs', async ({ page, context }) => {
    await page.goto('https://demoqa.com/');

    // ideme vytvorit novy tab
    const newTab = await context.newPage();
    await newTab.goto('https://www.saucedemo.com/');
  

    // dat deomga do popredia - 
    await page.bringToFront();

    await newTab.locator('#login-button').click();
    await newTab.close();
    
    });

});
